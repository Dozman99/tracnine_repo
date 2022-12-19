import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagerRoutingModule } from './order-manager-routing.module';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SingleDeliveryOrdersComponent } from './components/single-delivery-orders/single-delivery-orders.component';
import { MultipleDeliveryOrdersComponent } from './components/multiple-delivery-orders/multiple-delivery-orders.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateSingleOrderComponent } from './components/create-single-order/create-single-order.component';
import { DeliveryCalculatorComponent } from './components/delivery-calculator/delivery-calculator.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMultipleOrdersComponent } from './components/create-multiple-orders/create-multiple-orders.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DeleteOrderConfirmationComponent } from './components/delete-order-confirmation/delete-order-confirmation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ViewAllComponent,
    SingleDeliveryOrdersComponent,
    MultipleDeliveryOrdersComponent,
    CreateSingleOrderComponent,
    DeliveryCalculatorComponent,
    CreateMultipleOrdersComponent,
    OrderDetailsComponent,
    DeleteOrderConfirmationComponent
  ],
  imports: [
    CommonModule,
    OrderManagerRoutingModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    SharedModule
  ]
})
export class OrderManagerModule { }
