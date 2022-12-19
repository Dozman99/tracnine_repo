import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ApiResponse } from "../../shared/models/api-response";
import { map } from "rxjs/operators";
import { RoutePath } from "../../shared/models/route-path";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompanyLocationComponent } from '../../shared/components/create-company-location/create-company-location.component';
import { ICity, ICountry, ILga, IState } from '../models/country-state-city-lga';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { SharedService } from '../../shared/services/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  private readonly loginUrl = `${environment.authApi}/fleet/login`;
  private readonly registerUrl = `${environment.authApi}/account/Register`;
  private readonly sendOtpUrl = `${environment.authApi}/account/SendOTP`;
  private readonly setPasswordURL = `${environment.authApi}/account/SetPassword`;
  private readonly resetPasswordURL = `${environment.authApi}/account/ResetPassword`;
  private readonly activateAccountURL = `${environment.authApi}/account/Activate`;
  private readonly countryUrl = `${environment.coreApi}/country/GetAll`;
  private readonly stateUrl = `${environment.coreApi}/state/GetAll`;
  private readonly cityUrl = `${environment.coreApi}/city/GetAll`;
  private readonly lgaUrl = `${environment.coreApi}/lga/GetAll`;
  private readonly titlesURL = `${environment.coreApi}/title/GetAll`;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  listOfCountries: ICountry[] = [];
  listOfState: IState[] = [];
  listOfCity: ICity[] = [];
  listOfLga: ILga[] = [];
  listOfCountries$ = new BehaviorSubject<any>(false);
  titles: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly authService: AngularFireAuth,
    private readonly matDialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly shareService: SharedService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.getCountries();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: { email: string, password: string }): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.loginUrl, data)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        this.currentUserSubject.next(user.data);
        return user;
      })
      );
  }

  register(data: {
    username: string,
    password: string,
    surname: string,
    firstName: string,
    phoneNumber: string,
    email: string,
    identityType: string,
    identityId: string,
  }): Observable<ApiResponse<User>> {
    data.phoneNumber = data.phoneNumber.toString()
    return this.http.post<ApiResponse<User>>(this.registerUrl, data)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // console.log(user)
        // localStorage.setItem('currentUser', JSON.stringify(user.data));
        this.currentUserSubject.next(user.data);
        return user;
      })
      );
  }

  sendOTP(username: any) {
    const data = {
      username,
      recaptchaId: 'any',
      type: 'OTP_SET_PASSWORD'
    }
    return this.http.post(`${this.sendOtpUrl}`, data)
  }

  logout(): void {
    this.authService.signOut();
    localStorage.removeItem('access_token');
    localStorage.removeItem('userCredentials');
    // @ts-ignore
    this.currentUserSubject.next(null);
    this.router.navigate(['auth' + RoutePath.AUTHENTICATION_LOGIN]);
    // location.reload();
  }

  openCreateLocationCompanyModal(action: string, id?: string) {
    return this.matDialog.open(
      CreateCompanyLocationComponent,
      {
        height: '70vh',
        width: '50vw',
        data: {
          action,
          id
        }
      }
    )
  }

  setPassword(body: any) {
    return this.http.post(`${this.setPasswordURL}`, body);
  }

  resetPassword(body: any) {
    return this.http.post(`${this.resetPasswordURL}`, body);
  }

  activateAccount(token: string) {
    return this.http.post(`${this.activateAccountURL}/${token}`, {})
  }

  getCountries() {
    this.http.get(`${this.countryUrl}`)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.listOfCountries = res['data'];
            const arrayOfCountryStateCalls: Observable<any>[] = [];

            this.listOfCountries.forEach(
              (country: any) => {
                arrayOfCountryStateCalls.push(this.getStateByCountryId(country.id));
              }
            )

            this.sortCountryStates(arrayOfCountryStateCalls);

          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      );
  }

  sortCountryStates(arrayOfCountryStateCalls: any[]) {
    forkJoin(arrayOfCountryStateCalls)
      .subscribe(
        (res: any) => {
          res.forEach((item: any) => {
            const index = this.listOfCountries.findIndex(country => country.id === item['data'][0]['countryId']);

            if (!this.listOfCountries[index].states) {
              this.listOfCountries[index].states = item['data'];
            }

            const arrayOfCountryStateCityCalls: Observable<any>[] = [];
            const arrayOfCountryStateLgaCalls: Observable<any>[] = [];

            item['data'].forEach(
              (state: IState) => {
                arrayOfCountryStateCityCalls.push(this.getCityByCountryStateId(state.id));
                arrayOfCountryStateLgaCalls.push(this.getLgaByCountryStateId(state.id));
              }
            )

            this.sortCountryStatesCity(arrayOfCountryStateCityCalls);
            this.sortCountryStatesLga(arrayOfCountryStateLgaCalls);
          })
        }
      )
  }

  sortCountryStatesCity(arrayOfCountryStateCityCalls: any[]) {
    forkJoin(arrayOfCountryStateCityCalls)
      .subscribe(
        (res: any) => {
          res.forEach((item: any) => {
            this.listOfCountries.forEach(
              (country, i) => {
                if (item['data'].length > 0) {
                  const index = country.states.findIndex(state => state.id === item['data'][0]['countryStateId']);

                  console.log(index)
                  if (index !== -1) {
                    if (!this.listOfCountries[i].cities) {
                      this.listOfCountries[i].cities = item['data'];
                    }
                  }
                }
              }
            )
          })
          this.listOfCountries$.next(this.listOfCountries);
        }
      )
  }

  sortCountryStatesLga(arrayOfCountryStateLgaCalls: any[]) {
    forkJoin(arrayOfCountryStateLgaCalls)
      .subscribe(
        (res: any) => {
          res.forEach((item: any) => {
            this.listOfCountries.forEach(
              (country, i) => {
                if (item['data'].length > 0) {
                  const index = country.states.findIndex(state => state.id === item['data'][0]['countryStateId']);

                  if (index !== -1) {
                    if (!this.listOfCountries[i].lgas) {
                      this.listOfCountries[i].lgas = item['data'];
                    }
                  }
                }

              }
            )
          })

                this.listOfCountries$.next(this.listOfCountries);
        }
      )
  }

  getStateByCountryId(id: string) {
    return this.http.get(`${this.stateUrl}/${id}`)
  }

  getCityByCountryStateId(id: string) {
    return this.http.get(`${this.cityUrl}/${id}`)
  }

  getLgaByCountryStateId(id: string) {
    return this.http.get(`${this.lgaUrl}/${id}`)
  }

  getTitles() {
    return this.http.get(`${this.titlesURL}`)
  }
}
