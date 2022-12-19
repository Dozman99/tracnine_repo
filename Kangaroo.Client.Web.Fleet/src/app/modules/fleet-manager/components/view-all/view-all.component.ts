import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { environment } from 'src/environments/environment';
import { Driver } from '../../models/driver';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit, OnDestroy {
  vehicleColumns = ['Vehicle Type', 'Brand No.', 'Model No.', 'Plate No.', 'Year of Manufacture', 'Status', 'Preview Documents', 'star'];
  driverColumns = ['Name', 'Phone Number', 'Country', 'State', 'City', 'Status', 'Preview Documents', 'star'];
  vehiclesDataSource = new MatTableDataSource();
  driversDataSource = new MatTableDataSource();
  subscriptions$: Subscription = new Subscription;
  vehiclesError = '';
  driversError = '';
  vehicleLoading = true;
  driverLoading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;


  constructor(
    private readonly fleetService: FleetService,
    private readonly onboardService: OnboardService
  ) { }

  ngOnInit(): void {
    this.subscriptions$.add(this.fleetService.drivers.subscribe((response: any) => {
      this.driverLoading = false;
     if(response['success']) {
      this.driversError = '';
      console.log(response['data']['items'])
       this.driversDataSource = new MatTableDataSource(response['data']['items']);
    } else {
      this.driversError = response['messages'];
    }
    }))
    this.subscriptions$.add(this.fleetService.vehicles.subscribe((data: any) => {
      this.vehicleLoading = false;
     if(data['success']) {
       this.vehiclesError = '';
       // console.log(data['data']['items'])
        this.vehiclesDataSource = new MatTableDataSource(data['data']['items']);
     } else {
       this.vehiclesError = data['messages'];
     }
    }))
    this.getDrivers();
    this.getVehicles();
  }

  ngAfterViewInit() {
    this.vehiclesDataSource.paginator = this.paginator;
    this.vehiclesDataSource.sort = this.sort;
  }

  openAddDriverModal() {
    const openedModal = this.fleetService.openAddDriverModal('Add');

    openedModal.afterClosed()
    .subscribe(
      (res: any) => {
        if(res) {
          this.getDrivers();
        }
      }
    )
  }

  openAddVehicleModal() {
    const openedModal  = this.fleetService.openAddVehicleModal('Add');
    openedModal.afterClosed()
    .subscribe(
      (res: any) => {
        if(res) {
          this.getVehicles();
        }
      }
    )
  }

  openDriverDetailsModal(row: any) {
    const detailsModal = this.fleetService.openDriverDetailsModal(row);

    detailsModal.afterClosed()
    .subscribe(
      (res: any) => {
        if(res) {
          this.getDrivers();
        }
      }
    )
  }

  getVehicles() {
    this.vehicleLoading = true;
    this.fleetService.searchVehicles(1, 3, environment.companyId);
  }

  openVehicleDetailsModal(row: any) {
    const openModal = this.fleetService.openVehicleDetailsModal(row);
    openModal.afterClosed()
    .subscribe(
      (response: any) => {
        if(response) {
          this.getVehicles();
        }
      }
    )
  }

  getDrivers() {
    this.subscriptions$.add(this.onboardService.listOfCountries$
      .subscribe(
        res => {
          if(res) {
            this.driverLoading = true;
            this.fleetService.fetchDrivers(1, 3);
          }
        }
      )
    )
  }

  viewDocs(element: any, type: any) {
    this.fleetService.openDocsViewModal(element, type);
  }

  ngOnDestroy(): void {
      this.subscriptions$.unsubscribe();
  }
}
