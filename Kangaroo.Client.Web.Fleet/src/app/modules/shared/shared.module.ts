import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { PackageCategoryModalComponent } from './components/package-category-modal/package-category-modal.component';
import { PackageItemModalComponent } from './components/package-item-modal/package-item-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NotificationComponent } from './components/notification/notification.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CreateCompanyLocationComponent } from './components/create-company-location/create-company-location.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';



@NgModule({
  declarations: [
    PackageCategoryModalComponent,
    PackageItemModalComponent,
    NotificationComponent,
    OrdersTableComponent,
    CreateCompanyComponent,
    CreateCompanyLocationComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    NgxChartsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    NgMultiSelectDropDownModule,
    MatSelectModule,
    RouterModule
  ],
  exports: [
    NotificationComponent,
    OrdersTableComponent,
    NgxChartsModule,
    CreateCompanyComponent
  ]
})
export class SharedModule { }
