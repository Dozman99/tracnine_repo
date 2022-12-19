import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { UploadDocService } from 'src/app/modules/core/services/upload-doc/upload-doc.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { ICapacityUnit } from '../../models/capacityUnit';
import { Vehicle } from '../../models/vehicle';
import { IVehicleBrand } from '../../models/vehicleBrands';
import { IVehicleModel } from '../../models/vehicleModels';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  addVehicleFormPage1: FormGroup;
  addVehicleFormPage2: FormGroup;
  today = new Date();
  uploadedFile: File | any;
  subscription$ = new Subscription();
  loading = false;
  listOfVehicleBrands: IVehicleBrand[] = [];
  listOfVehicleModels: IVehicleModel[] = [];
  listOfCapacityUnits: ICapacityUnit[] = []
  dropdownSettings: IDropdownSettings = {};
  selectedBrand: any;
  selectedModel: any;
  selectedCapacityUnit: any;
  vehicle!: Vehicle;
  existingBrand: IVehicleBrand[] = [];
  existingModel: IVehicleModel[] = [];
  existingCapacityUnit: ICapacityUnit[] = [];
  vehicleTypes = [
    {id: 0, name: 'Car'},
    {id: 1, name: 'Bike'},
    {id: 2, name: 'Mini Van'},
    {id: 3, name: 'Van'},
    {id: 4, name: 'Mini Bus'},
    {id: 5, name: 'Bus'},
    {id: 6, name: 'Truck'},
    {id: 7, name: 'Trailer'}
  ]

  constructor(
    private readonly fb: FormBuilder,
    private readonly fleetService: FleetService,
    private readonly uploadDocsService: UploadDocService,
    private readonly notificationService: NotificationService,
    private readonly matDialogRef: MatDialogRef<AddVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { actionType: string, id: string }
  ) {
    this.addVehicleFormPage1 = this.fb.group({
      brandId: [0, Validators.required],
      modelId: [0, Validators.required],
      yearOfManufacture: ['', Validators.required],
      numberOfTyres: ['4'],
      type: ['', Validators.required],
      description: ['']
    })
    this.addVehicleFormPage2 = this.fb.group({
      plateNumber: ['', Validators.required],
      seatCount: [5],
      color: ['', Validators.required],
      capacity: [2],
    })
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'description',
      allowSearchFilter: true
    };
    // this.getVehicleBrands();
    this.getCapacityUnit();

    this.fleetService.listOfVehicleBrands$
      .subscribe((res) => {
        if (res) {
          this.listOfVehicleBrands = res;
        }
      })
  }

  saveVehicle() {
    if (!this.data.id) {
      this.createVehicle();
    } else {
      this.editVehicle();
    }
  }

  getVehicle() {
    this.fleetService.fetchVehicle(this.data.id);
  }

  /* getVehicleBrands() {
    this.fleetService.getVehicleBrands()
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.listOfVehicleBrands = res['data'];
        } else {
          this.notificationService.publishMessage('Error occured fetching vehicle brands', 'danger', 0);
        }
      }
    )
  } */

  getCapacityUnit() {
    this.fleetService.getCapacityUnit()
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.listOfCapacityUnits = res['data'];

            if (this.data.actionType === 'Edit') {
              this.subscription$.add(
                this.fleetService.vehicle.subscribe(
                  (res) => {
                    if (res) {
                      this.vehicle = res;
                      this.addVehicleFormPage1.patchValue({
                        description: this.vehicle.description,
                        brandId: [0, Validators.required],
                        modelId: [0, Validators.required],
                        type: this.vehicle.type,
                        yearOfManufacture: this.vehicle.yearOfManufacture,
                        numberOfTyres: this.vehicle.numberOfTyres,
                      })
                      this.addVehicleFormPage2.patchValue({
                        plateNumber: this.vehicle.plateNumber,
                        seatCount: this.vehicle.seatCount,
                        color: this.vehicle.color,
                        capacity: this.vehicle.capacity,
                      })

                      this.listOfVehicleBrands.forEach(
                        (brand) => {
                          if (brand.id === this.vehicle.vehicleBrandId) {
                            this.existingBrand = [brand];
                            this.selectedBrand = this.vehicle.vehicleBrandId;
                            this.listOfVehicleModels = brand.models;

                            this.listOfVehicleModels.forEach(
                              model => {
                                if (model.id === this.vehicle.vehicleModelId) {
                                  this.existingModel = [model];
                                  this.selectedModel = this.vehicle.vehicleModelId;
                                }
                              }
                            )
                          }
                        }
                      )

                      this.listOfCapacityUnits
                        .forEach(
                          unit => {
                            console.log(unit);

                            if (unit.id === this.vehicle.capacityUnitId) {
                              this.existingCapacityUnit = [unit];
                              this.selectedCapacityUnit = this.vehicle.capacityUnitId;
                            }
                          }
                        )
                    }
                  }
                )
              )

              this.getVehicle();
            }

          }
        }
      )
  }

  createVehicle() {
    this.loading = true;
    this.addVehicleFormPage1.value.companyId = environment.companyId;
    this.addVehicleFormPage1.value.vehicleBrandId = this.selectedBrand;
    this.addVehicleFormPage1.value.vehicleModelId = this.selectedModel;
    // this.addVehicleFormPage1.value.capacityUnitId = this.selectedCapacityUnit;
    this.addVehicleFormPage1.value.capacityUnitId = "aef2ebb4-37e6-4937-9ec4-bbac892d6426";
    const data = {
      ...this.addVehicleFormPage1.value,
      ...this.addVehicleFormPage2.value,
    }

    this.fleetService.createVehicle(data)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.subscription$.unsubscribe();
          if (response['success']) {
            this.matDialogRef.close(true);
            this.notificationService.publishMessage(response['messages'], 'success', 0);
          } else {
            this.notificationService.publishMessage(response['messages'], 'danger', 0);
          }
        }
      )
  }

  editVehicle() {
    this.loading = true;
    this.addVehicleFormPage1.value.companyId = environment.companyId;
    this.addVehicleFormPage1.value.vehicleBrandId = this.selectedBrand;
    this.addVehicleFormPage1.value.vehicleModelId = this.selectedModel;
    this.addVehicleFormPage1.value.capacityUnitId = this.selectedCapacityUnit;
    const data = {
      ...this.addVehicleFormPage1.value,
      ...this.addVehicleFormPage2.value,
    }

    this.fleetService.editVehicle(data, this.data.id)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.subscription$.unsubscribe();
          if (response['success']) {
            this.matDialogRef.close(true);
            this.notificationService.publishMessage(response['messages'], 'success', 0);
          } else {
            this.notificationService.publishMessage(response['messages'], 'danger', 0);
          }
        }
      )
  }

  uploadFile(event: any) {
    this.uploadedFile = event.target.files[0];
  }

  onBrandSelect(event: any) {
    this.selectedBrand = event.id;
    this.getVehicleModels(event.id);
  }

  getVehicleModels(id: string) {
    this.fleetService.getVehicleModels(id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.listOfVehicleModels = res['data'];
          } else {
            this.notificationService.publishMessage('Error occured fetching vehicle models', 'danger', 0);
          }
        }
      )
  }

  onBrandDeselect(event: any) {
    this.selectedBrand = undefined;
    this.selectedModel = undefined;
    this.listOfVehicleModels = [];
  }

  onModelSelect(event: any) {
    this.selectedModel = event.id;
  }
  onModelDeselect(event: any) {
    this.selectedModel = undefined;
  }

  onCapacityUnitSelect(event: any) {
    this.selectedCapacityUnit = event.id;
  }
  onCapacityUnitDeselect(event: any) {
    this.selectedCapacityUnit = undefined;
  }

}
