import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, forkJoin, Observable, Subject } from "rxjs";
import { Driver } from "../models/driver";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponse } from "../../shared/models/api-response";
import { retry } from "rxjs/operators";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDriverComponent } from '../components/add-driver/add-driver.component';
import { AddVehicleComponent } from '../components/add-vehicle/add-vehicle.component';
import { VehicleDetailsComponent } from '../components/vehicle-details/vehicle-details.component';
import { DriverDetailsComponent } from '../components/driver-details/driver-details.component';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { AddDriverDocsComponent } from '../components/add-driver-docs/add-driver-docs.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IVehicleBrand } from '../models/vehicleBrands';
import { Vehicle } from '../models/vehicle';
import { Router } from '@angular/router';
import { OnboardService } from '../../onboard/services/onboard.service';
import { SharedService } from '../../shared/services/shared/shared.service';
import { ViewDocsComponent } from '../components/view-docs/view-docs.component';
import { DocImageComponent } from '../components/doc-image/doc-image.component';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  private readonly driverUrl = `${environment.coreApi}/company-driver`;
  private readonly driverDocsUrl = `${environment.coreApi}/company-driver-doc`;
  private readonly vehicleUrl = `${environment.coreApi}/company-vehicle`;
  private readonly searchVehicleUrl = `${environment.coreApi}/company-vehicle/search`;
  private readonly vehicleDocsUrl = `${environment.coreApi}/company-vehicle-doc`;
  private readonly vehicleBrandUrl = `${environment.coreApi}/vehicle-brand/getall`;
  private readonly vehicleModelUrl = `${environment.coreApi}/vehicle-model/getall`;
  private readonly vehicleCapacityUnitUrl = `${environment.coreApi}/capacity-unit/getall`;

  drivers: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  vehicles: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  driver: Subject<Driver> = new Subject<Driver>();
  vehicle: Subject<Vehicle> = new Subject<Vehicle>();
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  driverDeleted$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  driverActivated$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  driverDeactivated$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  driverArchived$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  driverRestored$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  vehicleDeleted$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  vehicleActivated$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  vehicleDeactivated$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  vehicleArchived$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  vehicleRestored$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  listOfVehicleBrands$: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  vehicleTypes = [
    { Car: 0 },
    { Bike: 1 },
    { MiniVan: 2 },
    { Van: 3 },
    { MiniBus: 4 },
    { Bus: 5 },
    { Trucks: 6 },
    { Trailer: 7 }
  ]
  decodedToken: any;
  listOfVehicleBrands: IVehicleBrand[] = [];
  canFetchVehicles = true;
  titles = []


  constructor(
    private http: HttpClient,
    private readonly modalDialog: MatDialog,
    //private readonly modalDialogRef: MatDialogRef<DriverDetailsComponent>,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly onboardService: OnboardService,
    private readonly shareService: SharedService,
  ) {
    this.getVehicleBrands();

    this.shareService.getTitles();
    this.shareService.title$
      .pipe(
        retry(3)
      )
      .subscribe(
        (res) => {
          if (res) {
            this.titles = res;
          }
        }
      );
  }


  fetchDrivers(pageIndex: number, pageSize: number, filters?: any[]): void {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);
    this.loading.next(true);
    this.http.get<ApiResponse<Driver[]>>(`${this.driverUrl}/Search/${environment.companyId}`, { params })
      .pipe(retry(3))
      .subscribe((response: any) => {
        if (response['success']) {
          response['data']['items']
            .forEach((element: Driver) => {
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

              /* switch(element.type) {
                case 0:
                  element.typeName = 'Truck';
                  break;
                case 1:
                  element.typeName = 'MiniVan';
                  break;
                case 2:
                  element.typeName = 'Van';
                  break;
                case 3:
                  element.typeName = 'MiniBus';
                  break;
                case 4:
                  element.typeName = 'Bus';
                  break;
                case 5:
                  element.typeName = 'Trailer';
                  break;
                default:
                  break
              } */
            });
        }
        this.drivers.next(response);
        this.loading.next(false);
      });
  }

  fetchDriver(id: string | null): void {
    this.loading.next(true);
    this.http.get<ApiResponse<Driver>>(`${this.driverUrl}/GetItem/${id}`)
      .pipe(retry(3))
      .subscribe((response: any) => {
        if (response['success']) {
          const element = response['data'];

          this.titles.forEach((title: any) => {
            if (title.id === element.titleId) {
              element.title = title['description']
            }
          })

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
        }
        this.driver.next(response.data);
        this.loading.next(false);
      });
  }

  fetchVehicle(id: string | null): void {
    this.loading.next(true);
    this.http.get<ApiResponse<Vehicle>>(`${this.vehicleUrl}/GetItem/${id}`)
      .pipe(retry(3))
      .subscribe((response: any) => {
        if (response['success']) {
          const element = response['data'];

          this.listOfVehicleBrands.forEach(
            (brand) => {
              if (element.vehicleBrandId === brand.id) {
                element['brandName'] = brand.description;
              }
              brand.models.forEach(
                (model) => {
                  if (element.vehicleModelId === model.id) {
                    element['modelName'] = model.description;
                  }
                }
              )
            }
          )

          switch (element.type) {
            case 0:
              element.typeName = 'Car';
              break;
            case 1:
              element.typeName = 'Bike';
              break;
            case 2:
              element.typeName = 'MiniVan';
              break;
            case 3:
              element.typeName = 'Van';
              break;
            case 4:
              element.typeName = 'MiniBus';
              break;
            case 5:
              element.typeName = 'Bus';
              break;
            case 6:
              element.typeName = 'Truck';
              break;
            case 7:
              element.typeName = 'Trailer';
              break;
            default:
              break
          }
        }
        this.vehicle.next(response.data);
        this.loading.next(false);
      });
  }

  createDriver(body: any) {
    return this.http.post(`${this.driverUrl}/Create`, body)
  }

  editDriver(body: any, id: string) {
    return this.http.put(`${this.driverUrl}/Update/${id}`, body)
  }

  getVehicles(pageIndex: number, pageSize: number, id: string): void {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);
    this.loading.next(true);
    this.http.get<ApiResponse<any>>(`${this.vehicleUrl}/GetAll/${id}`, { params })
      .pipe(retry(3))
      .subscribe((response: any) => {
        if (response['success']) {
          response['data']['items']
            .forEach((element: Vehicle) => {
              this.listOfVehicleBrands.forEach(
                (brand) => {
                  if (element.vehicleBrandId === brand.id) {
                    element['brandName'] = brand.description;
                  }
                  brand.models.forEach(
                    (model) => {
                      if (element.vehicleModelId === model.id) {
                        element['modelName'] = model.description;
                      }
                    }
                  )
                }
              )

              switch (element.type) {
                case 0:
                  element.typeName = 'Car';
                  break;
                case 1:
                  element.typeName = 'Bike';
                  break;
                case 2:
                  element.typeName = 'MiniVan';
                  break;
                case 3:
                  element.typeName = 'Van';
                  break;
                case 4:
                  element.typeName = 'MiniBus';
                  break;
                case 5:
                  element.typeName = 'Bus';
                  break;
                case 6:
                  element.typeName = 'Truck';
                  break;
                case 7:
                  element.typeName = 'Trailer';
                  break;
                default:
                  break
              }
            });
        }
        this.vehicles.next(response);
        this.loading.next(false);
      });
  }

  searchVehicles(pageIndex: number, pageSize: number, id: string): void {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);
    this.loading.next(true);
    this.http.get<ApiResponse<any>>(`${this.searchVehicleUrl}/${id}`, { params })
      .pipe(
        retry(3)
      )
      .subscribe((response: any) => {
        if (response['success']) {
          response['data']['items']
            .forEach((element: Vehicle) => {
              this.listOfVehicleBrands.forEach(
                (brand) => {
                  if (element.vehicleBrandId === brand.id) {
                    element['brandName'] = brand.description;
                  }
                  brand.models.forEach(
                    (model) => {
                      if (element.vehicleModelId === model.id) {
                        element['modelName'] = model.description;
                      }
                    }
                  )
                }
              )

              switch (element.type) {
                case 0:
                  element.typeName = 'Car';
                  break;
                case 1:
                  element.typeName = 'Bike';
                  break;
                case 2:
                  element.typeName = 'MiniVan';
                  break;
                case 3:
                  element.typeName = 'Van';
                  break;
                case 4:
                  element.typeName = 'MiniBus';
                  break;
                case 5:
                  element.typeName = 'Bus';
                  break;
                case 6:
                  element.typeName = 'Truck';
                  break;
                case 7:
                  element.typeName = 'Trailer';
                  break;
                default:
                  break
              }
            });
        }
        this.vehicles.next(response);
        this.loading.next(false);
      });
  }

  createVehicle(data: any) {
    return this.http.post(`${this.vehicleUrl}/Create`, data);
  }

  editVehicle(data: any, id: string) {
    return this.http.put(`${this.vehicleUrl}/Update/${id}`, data);
  }

  openAddDriverModal(actionType: string, id?: string) {
    return this.modalDialog.open(
      AddDriverComponent,
      {
        height: '90vh',
        width: '55vw',
        data: {
          actionType,
          id
        }
      }
    )
  }

  openAddVehicleModal(actionType: string, id?: string) {
    return this.modalDialog.open(
      AddVehicleComponent,
      {
        height: '90vh',
        width: '40vw',
        data: {
          actionType,
          id
        }
      }
    )
  }

  openVehicleDetailsModal(row: any) {
    return this.modalDialog.open(
      VehicleDetailsComponent,
      {
        height: '70vh',
        width: '50vw',
        data: row
      }
    )
  }

  openDriverDetailsModal(row: any) {
    return this.modalDialog.open(
      DriverDetailsComponent,
      {
        height: '90vh',
        width: '50vw',
        data: row
      }
    )
  }

  deactivateDriver(id: string) {
    let params = new HttpParams();
    params = params.append('id', id)
    this.http.post<ApiResponse<any>>(`${this.driverUrl}/Deactivate/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.driverDeactivated$.next(true);
            this.notificationService.publishMessage('Successfully deactivated driver', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

  reactivateDriver(id: string) {
    let params = new HttpParams();
    params = params.append('id', id)
    this.http.post(`${this.driverUrl}/Activate/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.driverActivated$.next(true);
            this.notificationService.publishMessage('Successfully activated driver', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
          /* if(res['success']) {
            this.deeactivateDriver
          } */
        }
      )
  }

  archiveDriver(id: string) {
    let params = new HttpParams();
    params = params.append('id', id)
    this.http.post<ApiResponse<any>>(`${this.driverUrl}/Archive/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.driverArchived$.next(true);
            this.notificationService.publishMessage('Successfully archived driver', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

  restoreDriver(id: string) {
    let params = new HttpParams();
    params = params.append('id', id)
    this.http.post(`${this.driverUrl}/Restore/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.driverRestored$.next(true);
            this.notificationService.publishMessage('Successfully restored driver', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
          /* if(res['success']) {
            this.deeactivateDriver
          } */
        }
      )
  }

  deleteDriver(id: string) {
    this.http.delete(`${this.driverUrl}/Delete/${id}`)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.driverDeleted$.next(true);
            //this.modalDialogRef.close(true);
            this.notificationService.publishMessage(`Successfully deleted driver`, 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
          /* if(res['success']) {
            this.deeactivateDriver
          } */
        }
      )
  }

  deactivateVehicle(id: string) {
    let params = new HttpParams();
    params = params.append('id', id)
    this.http.post<ApiResponse<any>>(`${this.vehicleUrl}/Deactivate/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.vehicleDeactivated$.next(true);
            this.notificationService.publishMessage('Successfully deactivated vehicle', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

  reactivateVehicle(id: string) {
    let params = new HttpParams();
    params = params.append('id', id)
    this.http.post(`${this.vehicleUrl}/Activate/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.vehicleActivated$.next(true);
            this.notificationService.publishMessage('Successfully activated vehicle', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
          /* if(res['success']) {
            this.deeactivateVehicle
          } */
        }
      )
  }

  deleteVehicle(id: string) {
    this.http.delete(`${this.vehicleUrl}/Delete/${id}`)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.vehicleDeleted$.next(true);
            //this.modalDialogRef.close(true);
            this.notificationService.publishMessage(`Successfully deleted vehicle`, 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
          /* if(res['success']) {
            this.deeactivateVehicle
          } */
        }
      )
  }

  archiveVehicle(id: string) {
    this.http.post(`${this.vehicleUrl}/Archive/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.vehicleArchived$.next(true);
            //this.modalDialogRef.close(true);
            this.notificationService.publishMessage(`Successfully archived vehicle`, 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
          /* if(res['success']) {
            this.deeactivateVehicle
          } */
        }
      )
  }

  restoreVehicle(id: string) {
    this.http.post(`${this.vehicleUrl}/Restore/${id}`, {})
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.vehicleRestored$.next(true);
            //this.modalDialogRef.close(true);
            this.notificationService.publishMessage(`Successfully restored vehicle`, 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
          /* if(res['success']) {
            this.deeactivateVehicle
          } */
        }
      )
  }

  openDocsModal(id: string, type: string, action: string) {
    return this.modalDialog.open(
      AddDriverDocsComponent,
      {
        height: '80vh',
        width: '50vw',
        data: {
          id,
          type,
          action
        }
      }
    )
  }

  openDocsViewModal(element: any, type: string) {
    this.modalDialog.open(
      ViewDocsComponent,
      {
        height: '80vh',
        width: '50vw',
        data: {
          element,
          type
        }
      }
    )
  }

  /* openVehicleDocsModal(userId: string) {
    this.modalDialog.open(
      AddDriverDocsComponent,
      {
        height: '80vh',
        width: '50vw',
        data: {
          userId
        }
      }
    )
  } */

  updateDriver(id: string, body: any) {
    return this.http.patch(`${this.driverUrl}/Update/${id}`, body);
  }

  getVehicleBrands() {
    this.http.get(`${this.vehicleBrandUrl}`)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.listOfVehicleBrands = res['data'];
            this.listOfVehicleBrands$.next(this.listOfVehicleBrands);
            const arrayOfModelCalls: Observable<any>[] = [];

            this.listOfVehicleBrands.forEach(
              (brand) => {
                arrayOfModelCalls.push(this.getVehicleModels(brand.id));
              }
            )

            this.sortVehicleBrandModels(arrayOfModelCalls);

          }
        }
      );
  }

  sortVehicleBrandModels(arrayOfModelCalls: any[]) {
    forkJoin(arrayOfModelCalls)
      .subscribe(
        (res: any) => {
          res.forEach((item: any) => {
            const index = this.listOfVehicleBrands.findIndex(brand => brand.id === item['data'][0]['vehicleBrandId']);

            if (!this.listOfVehicleBrands[index].models) {
              this.listOfVehicleBrands[index].models = item['data'];
            }
            // if(item['data'])
          })
          if (this.canFetchVehicles) {
            if (this.router.url === '/main/fleet-manager') {
              this.searchVehicles(1, 3, environment.companyId);
            } else {
              if (this.router.url === '/main/fleet-manager/vehicles') {
                this.searchVehicles(1, 10, environment.companyId);
              }
            }

            this.canFetchVehicles = false;
          }
        }
      )
  }

  openDocImageModal(fileUrl: string) {
    return this.modalDialog.open(
      DocImageComponent,
      {
        height: '90vh',
        width: '55vw',
        data: {
          fileUrl
        }
      }
    )
  }

  getVehicleModels(id: string) {
    return this.http.get(`${this.vehicleModelUrl}/${id}`);
  }

  getCapacityUnit() {
    return this.http.get(`${this.vehicleCapacityUnitUrl}`)
  }


}
