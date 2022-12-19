import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Driver} from "../../models/driver";
import {FleetService} from "../../services/fleet.service";
import {Router} from "@angular/router";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';

@Component({
  selector: 'app-view-all-driver',
  templateUrl: './view-all-driver.component.html',
  styleUrls: ['../view-all/view-all.component.scss']
})
export class ViewAllDriverComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  driverColumns = ['Name', 'Phone Number', 'Country', 'State', 'City', 'Status', 'Preview Documents', 'star'];
  totalCount = 0;

  driversDataSource: MatTableDataSource<any> = new MatTableDataSource();

  drivers: Driver[] = [];
  loading: boolean = false;
  pageIndex = 1;
  pageSize = 10;
  subscription$ = new Subscription();
  driversError = '';
  subscriptions$ = new Subscription();

  constructor(
    private fleetService: FleetService,
    private router: Router,
    private readonly onboardService: OnboardService
  ) { }

  ngOnInit(): void {
    this.subscriptions$.add(this.fleetService.drivers.subscribe((response: any) => {
      this.loading = false;
     if(response['success']) {
      this.driversError = '';
      console.log(response['data']['items'])
      this.totalCount = response['data']['totalCount'];
       this.driversDataSource = new MatTableDataSource(response['data']['items']);
    } else {
      this.driversError = response['messages'];
    }
    }))
    this.getDrivers();
    this.fleetService.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngAfterViewInit(): void {
    this.driversDataSource.paginator = this.paginator;
    this.driversDataSource.sort = this.sort;
  }

  getDrivers() {
    this.subscriptions$.add(this.onboardService.listOfCountries$
      .subscribe(
        res => {
          if(res) {
            this.loading = true;
            this.fleetService.fetchDrivers(this.pageIndex, this.pageSize);
          }
        }
      )
    )
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

  changePage(page: PageEvent) {
    // console.log(page)
    if(page.previousPageIndex !== undefined) {
      console.log(page)
      if(page.pageIndex > page.previousPageIndex) {
        this.pageIndex = page.pageIndex + 1;
        console.log(this.pageIndex)
      } else {
        if(page.pageIndex === 0) {
          this.pageIndex = 1;
        } else {
          this.pageIndex = page.pageIndex + 1;
        }
      }
    }
    this.pageSize = page.pageSize;

    this.getDrivers()
  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  viewDocs(element: any, type: any) {
    this.fleetService.openDocsViewModal(element, type);
  }

}
