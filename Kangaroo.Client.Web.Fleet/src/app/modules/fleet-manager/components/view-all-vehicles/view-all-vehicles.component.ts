import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-view-all-vehicles',
  templateUrl: './view-all-vehicles.component.html',
  styleUrls: ['./view-all-vehicles.component.scss']
})
export class ViewAllVehiclesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  vehicleColumns = ['Vehicle Type', 'Brand No.', 'Model No.', 'Plate No.', 'Year of Manufacture', 'Status', 'Preview Documents', 'star'];
  vehiclesDataSource = new MatTableDataSource();
  pageIndex = 1;
  pageSize = 5;
  totalCount = 0;
  subscription$: Subscription = new Subscription();
  vehiclesError = '';
  vehicleLoading = true;

  constructor(
    private readonly fleetService: FleetService
  ) { }

  ngOnInit(): void {
    // this.getVehicles();
    this.subscription$ = this.fleetService.vehicles.subscribe(
      data => {
        if (data) {
          this.vehicleLoading = false;
          if (data['success']) {
            this.vehiclesError = '';
            this.totalCount = data['data']['totalCount'];
            this.vehiclesDataSource = new MatTableDataSource(data['data']['items']);
          } else {
            this.vehiclesError = data['messages'];
          }
        }
      }
    )
    this.getVehicles();
  }

  ngAfterViewInit(): void {
    this.vehiclesDataSource.paginator = this.paginator;
    this.vehiclesDataSource.sort = this.sort;
  }

  openAddVehicleModal() {
    const openedModal = this.fleetService.openAddVehicleModal('Add');
    openedModal.afterClosed()
      .subscribe(
        (res: any) => {
          if (res) {
            this.pageIndex = 1;
            this.getVehicles();
          }
        }
      )
  }

  getVehicles() {
    this.vehicleLoading = true;
    this.fleetService.searchVehicles(this.pageIndex, this.pageSize, environment.companyId);
  }

  changePage(page: PageEvent) {
    // console.log(page)
    if (page.previousPageIndex !== undefined) {
      console.log(page)
      if (page.pageIndex > page.previousPageIndex) {
        this.pageIndex = page.pageIndex + 1;
      } else {
        if (page.pageIndex === 0) {
          this.pageIndex = 1;
        } else {
          this.pageIndex = page.pageIndex + 1;
        }
      }
    }
    this.pageSize = page.pageSize;

    this.getVehicles()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  openVehicleDetailsModal(row: any) {
    const openModal = this.fleetService.openVehicleDetailsModal(row);
    openModal.afterClosed()
      .subscribe(
        (response: any) => {
          if (response) {
            this.getVehicles();
          }
        }
      )
  }

  viewDocs(element: any, type: any) {
    this.fleetService.openDocsViewModal(element, type);
  }

}
