import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import {MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import { SingleDeliveryOrdersComponent } from './components/single-delivery-orders/single-delivery-orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MultipleDeliveryOrdersComponent } from './components/multiple-delivery-orders/multiple-delivery-orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SingleDeliveryOrdersComponent,
    MultipleDeliveryOrdersComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class DeliveryModule { }
