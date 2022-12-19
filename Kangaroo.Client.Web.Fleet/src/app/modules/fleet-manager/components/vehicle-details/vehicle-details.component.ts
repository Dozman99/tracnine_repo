import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Vehicle } from '../../models/vehicle';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  subscription$ = new Subscription();
  vehicle!: Vehicle;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly fleetService: FleetService,
    private readonly modalRef: MatDialogRef<VehicleDetailsComponent>
    ) { }

  ngOnInit(): void {
    this.subscription$ =  this.fleetService.vehicle.subscribe(
      res => {
        this.vehicle = res;
      }
    )
    this.getVehicle();
  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  getVehicle() {
    this.fleetService.fetchVehicle(this.data.id);
  }

  reactivateVehicle() {
    this.subscription$.add(this.fleetService.vehicleActivated$
      .subscribe(
        (res: any) => {
          if(res) {
            this.modalRef.close(true);
          }
        }))
    this.fleetService.reactivateVehicle(this.data.id);
  }

  deactivateVehicle() {
    this.subscription$.add(this.fleetService.vehicleDeactivated$
      .subscribe(
        (res: any) => {
          if(res) {
            this.modalRef.close(true);
          }
        }))
    this.fleetService.deactivateVehicle(this.data.id);
  }

  restoreVehicle() {
    this.subscription$.add(this.fleetService.vehicleRestored$
      .subscribe(
        (res: any) => {
          if(res) {
            this.modalRef.close(true);
          }
        }))
    this.fleetService.restoreVehicle(this.data.id);
  }

  archiveVehicle() {
    this.subscription$.add(this.fleetService.vehicleArchived$
      .subscribe(
        (res: any) => {
          if(res) {
            this.modalRef.close(true);
          }
        }))
    this.fleetService.archiveVehicle(this.data.id);
  }

  deleteVehicle() {
    this.subscription$.add(this.fleetService.vehicleDeleted$
    .subscribe(
      (res: any) => {
        if(res) {
          this.modalRef.close(true);
        }
      }))
    this.fleetService.deleteVehicle(this.data.id);
  }

  editVehicle() {
    this.fleetService.openAddVehicleModal('Edit', this.vehicle.id)
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

  addVehicleDocs() {
    this.fleetService.openDocsModal(this.vehicle.id, 'Vehicle', 'Add')
  }

  viewDocs(vehicle: any, type: any) {
    this.fleetService.openDocsViewModal(vehicle, type);
  }

}
