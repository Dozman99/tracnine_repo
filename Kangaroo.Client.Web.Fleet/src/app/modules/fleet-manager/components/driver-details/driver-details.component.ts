import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { Driver } from '../../models/driver';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription;
  driver!: Driver;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly fleetService: FleetService,
    private readonly modalRef: MatDialogRef<DriverDetailsComponent>,
    private readonly onboardService: OnboardService
  ) {
    this.subscription$ =  this.fleetService.driver.subscribe(
      res => {
        this.driver = res;
      }
    )
  }

  ngOnInit(): void {
    this.getDriver();
  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  getDriver() {
    this.subscription$.add(this.onboardService.listOfCountries$
    .subscribe(
      (res: any) => {
        if(res) {
          this.fleetService.fetchDriver(this.data.id);
        }
      }
    )
    )
  }

  reactivateDriver() {
    this.fleetService.driverActivated$
    .subscribe(
      (res: any) => {
        if(res) {
          this.modalRef.close(true);
        }
      })
    this.fleetService.reactivateDriver(this.data.id);
  }

  deactivateDriver() {
    this.fleetService.driverDeactivated$
    .subscribe(
      (res: any) => {
        if(res) {
          this.modalRef.close(true);
        }
      })
    this.fleetService.deactivateDriver(this.data.id);
  }

  archiveDriver() {
    this.fleetService.driverArchived$
    .subscribe(
      (res: any) => {
        if(res) {
          this.modalRef.close(true);
        }
      })
    this.fleetService.archiveDriver(this.data.id);
  }

  restoreDriver() {
    this.fleetService.driverRestored$
    .subscribe(
      (res: any) => {
        if(res) {
          this.modalRef.close(true);
        }
      })
    this.fleetService.restoreDriver(this.data.id);
  }

  deleteDriver() {
    this.fleetService.driverDeleted$
    .subscribe(
      (res: any) => {
        if(res) {
          this.modalRef.close(true);
        }
      })
    this.fleetService.deleteDriver(this.data.id);
  }

  addDriverDocs() {
    this.fleetService.openDocsModal(this.driver.id, 'Driver', 'Add')
  }

  viewDocs(driver: any, type: any) {
    this.fleetService.openDocsViewModal(driver, type);
  }

  editDriver() {
    this.fleetService.openAddDriverModal('Edit', this.driver.id)
    .afterClosed()
    .subscribe(
      ((res: any) => {
        if(res) {
          this.modalRef.close(true);
        } else {
          this.modalRef.close();
        }

      })
    )
  }

}
