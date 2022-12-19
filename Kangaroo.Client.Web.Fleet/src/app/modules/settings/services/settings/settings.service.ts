import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICompanyDetails } from 'src/app/modules/core/interfaces/company/company-details';
import { ICompanyLocationDetails } from 'src/app/modules/core/interfaces/company/company-location-details';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { EditCompanyComponent } from '../../components/edit-company/edit-company.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  getCompanyById$ = new BehaviorSubject(false);
  getCompanyLocationById$ = new BehaviorSubject<any>(false);
  allCompanyLocations$ = new BehaviorSubject<any>(false);
  searchCompanyContactByCompanyID$ = new BehaviorSubject<any>(false);
  searchCompanyPhoneByCompanyID$ = new BehaviorSubject<any>(false);
  searchCompanyEmailByCompanyID$ = new BehaviorSubject<any>(false);
  subscription$ = new Subscription();

  companyDetails!: ICompanyDetails;
  allCompanyLocations: ICompanyLocationDetails[] = [];
  companyLocationDetails!: ICompanyLocationDetails;
  baseApi = environment.coreApi + '/Company';
  companyLocationBaseApi2 = environment.coreApi + '/company-location';
  private readonly companyLocationContactUrl = `${environment.coreApi}/Company-location-contact`;
  private readonly companyLocationEmailUrl = `${environment.coreApi}/Company-location-email`;
  private readonly companyLocationPhoneUrl = `${environment.coreApi}/Company-location-phone`;

  constructor(
    private readonly http: HttpClient,
    private readonly matDialog: MatDialog,
    private readonly onboardService: OnboardService,
    private readonly notificationService: NotificationService,
  ) { }

  openEditModal() {
    const openedModal = this.matDialog.open(
      EditCompanyComponent,
      {
        width: '40vw',
        height: '80vh'
      }
    )

    return openedModal;
  }

  createCompany(data: any) {
    return this.http.post(`${this.baseApi}/Register`, data);
  }

  updateCompany(id: string = environment.companyId, body: any) {
    return this.http.patch(`${this.baseApi}/Update/${id}`, body);
  }

  updateCompanyBanner(id: string = environment.companyId, body: any) {
    return this.http.patch(`${this.baseApi}/UpdateBanner/${id}`, body);
  }
  updateCompanyLogo(id: string = environment.companyId, body: any) {
    return this.http.patch(`${this.baseApi}/UpdateLogo/${id}`, body);
  }

  getCompanyById(id: string = environment.companyId) {
    return this.http.get(`${this.baseApi}/Get/${id}`);
  }

  deleteCompany(id: string = environment.companyId) {
    return this.http.delete(`${this.baseApi}/Delete/${id}`);
  }

  deactivateCompany(id: string = environment.companyId) {
    return this.http.post(`${this.baseApi}/Deactivate`, {})
  }

  activateCompany(id: string = environment.companyId) {
    return this.http.post(`${this.baseApi}/Activate`, {})
  }

  restoreCompany(id: string = environment.companyId) {
    return this.http.post(`${this.baseApi}/Restore`, {})
  }

  archiveCompany(id: string = environment.companyId) {
    return this.http.post(`${this.baseApi}/Archive`, {})
  }

  createCompanyLocation(data: any) {
    return this.http.post(`${this.companyLocationBaseApi2}/Create`, data)
  }

  updateCompanyLocation(data: any, id: any) {
    return this.http.put(`${this.companyLocationBaseApi2}/Update/${id}`, data)
  }

  getAllCompanyLocations(id: string, pageIndex: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);

    return this.http.get(`${this.companyLocationBaseApi2}/search/${id}`, {params})
    .pipe();
  }

  getCompanyLocation(id: string) {
    this.http.get(`${this.companyLocationBaseApi2}/GetItem/${id}`)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.getCompanyLocationById$.next(res['data'])
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    );
  }

  deleteCompanyLocationPhone(id: string) {
    return this.http.delete(`${this.companyLocationPhoneUrl}/Delete/${id}`);
  }

  deleteCompanyLocationEmail(id: string) {
    return this.http.delete(`${this.companyLocationEmailUrl}/Delete/${id}`);
  }

  deleteCompanyLocationContact(id: string) {
    return this.http.delete(`${this.companyLocationContactUrl}/Delete/${id}`);
  }

  deleteCompanyLocation(id: string) {
    return this.http.delete(`${this.companyLocationBaseApi2}/Delete/${id}`);
  }

  activateCompanyLocation(id: string) {
    let params = new HttpParams();
    params = params.append('ID', id);

    return this.http.post(`${this.companyLocationBaseApi2}/Activate/${id}`, {})
  }

  deactivateCompanyLocation(id: string) {
    let params = new HttpParams();
    params = params.append('ID', id);
    
    return this.http.post(`${this.companyLocationBaseApi2}/Deactivate/${id}`, {})
  }

  archiveCompanyLocation(id: string) {
    let params = new HttpParams();
    params = params.append('ID', id);
    
    return this.http.post(`${this.companyLocationBaseApi2}/Archive/${id}`, {})
  }

  restoreCompanyLocation(id: string) {
    let params = new HttpParams();
    params = params.append('ID', id);
    
    return this.http.post(`${this.companyLocationBaseApi2}/Restore/${id}`, {})
  }

  createCompanyLocationContact(data: any) {
    return this.http.post(`${this.companyLocationContactUrl}/Create`, data);
  }

  createCompanyLocationEmail(data: any) {
    return this.http.post(`${this.companyLocationEmailUrl}/Create`, data);
  }

  createCompanyLocationPhone(data: any) {
    return this.http.post(`${this.companyLocationPhoneUrl}/Create`, data);
  }

  updateCompanyLocationContact(data: any, id: any) {
    return this.http.put(`${this.companyLocationContactUrl}/update/${id}`, data);
  }

  updateCompanyLocationEmail(data: any, id: any) {
    return this.http.put(`${this.companyLocationEmailUrl}/update/${id}`, data);
  }

  updateCompanyLocationPhone(data: any, id: any) {
    return this.http.put(`${this.companyLocationPhoneUrl}/update/${id}`, data);
  }

  getCompanyContactByID(id: any) {
    this.http.get(`${this.companyLocationContactUrl}/getitem/${id}`)
  }

  searchCompanyContactByCompanyID(id: any) {
    this.http.get(`${this.companyLocationContactUrl}/search/${id}`)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.searchCompanyContactByCompanyID$.next(res['data']['items'])
        }
      }
    )
  }

  searchCompanyPhoneByCompanyID(id: any) {
    this.http.get(`${this.companyLocationPhoneUrl}/search/${id}`)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.searchCompanyPhoneByCompanyID$.next(res['data']['items'])
        }
      }
    )
  }
  searchCompanyEmailByCompanyID(id: any) {
    this.http.get(`${this.companyLocationEmailUrl}/search/${id}`)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.searchCompanyEmailByCompanyID$.next(res['data']['items'])
        }
      }
    )
  }

  getAllCompanyLocation(pageIndex: number, pageSize: number) {
    this.subscription$.add(this.onboardService.listOfCountries$
      .subscribe(
        response => {
          if (response) {
            this.getAllCompanyLocations(environment.companyId, pageIndex, pageSize)
              .subscribe(
                (res: any) => {
                  if (res['success']) {
                    this.allCompanyLocations = res['data']['items'];
                    this.allCompanyLocations
                    .forEach((element: any) => {
                      this.onboardService.listOfCountries.forEach(
                        (country) => {
                          if (element.countryId === country.id) {
                            element['countryName'] = country.description;
                          }
                          if (country.states.length) {
                            country.states.forEach(
                              (state) => {
                                if (element.stateId === state.id) {
                                  element['stateName'] = state.description;
                                }
                              }
                            )
                          }
                          if (country.cities) {
                            country.cities.forEach(
                              (city) => {
                                if (element.cityId === city.id) {
                                  element['cityName'] = city.description;
                                }
                              }
                            )
                          }
                          if (country.lgas) {
                            country.lgas.forEach(
                              (lga) => {
                                if (element.lgaId === lga.id) {
                                  element['lgaName'] = lga.description;
                                }
                              }
                            )
                          }
                        }
                      )
                    });
                    res['data']['items'] = this.allCompanyLocations
                    this.allCompanyLocations$.next(res)
                  } else {
                    this.notificationService.publishMessage(res['messages'], 'danger', 0);
                  }
                }
              )
          }
        }
      )
    )

  }
}
