import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetManagerRoutingModule } from './fleet-manager-routing.module';
import { ViewAllDriverComponent } from './components/view-all-driver/view-all-driver.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { ViewAllVehiclesComponent } from './components/view-all-vehicles/view-all-vehicles.component';
import { MatButtonModule } from '@angular/material/button';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FleetService } from './services/fleet.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddDriverDocsComponent } from './components/add-driver-docs/add-driver-docs.component';
import {MatMenuModule} from '@angular/material/menu';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewDocsComponent } from './components/view-docs/view-docs.component';
import { DocImageComponent } from './components/doc-image/doc-image.component';



@NgModule({
  declarations: [
    ViewAllDriverComponent,
    ViewAllComponent,
    ViewAllVehiclesComponent,
    AddVehicleComponent,
    AddDriverComponent,
    VehicleDetailsComponent,
    DriverDetailsComponent,
    AddDriverDocsComponent,
    ViewDocsComponent,
    DocImageComponent
  ],
  imports: [
    CommonModule,
    FleetManagerRoutingModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatPaginatorModule,
    MatMenuModule,
    NgMultiSelectDropDownModule,
    FormsModule
  ],
  providers: [FleetService]
})
export class FleetManagerModule { }
