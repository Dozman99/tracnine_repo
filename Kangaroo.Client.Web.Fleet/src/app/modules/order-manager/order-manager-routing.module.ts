import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleDeliveryOrdersComponent } from '../delivery/components/multiple-delivery-orders/multiple-delivery-orders.component';
import { CreateMultipleOrdersComponent } from './components/create-multiple-orders/create-multiple-orders.component';
import { CreateSingleOrderComponent } from './components/create-single-order/create-single-order.component';
import { SingleDeliveryOrdersComponent } from './components/single-delivery-orders/single-delivery-orders.component';
import { ViewAllComponent } from './components/view-all/view-all.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAllComponent
  },
  {
    path: 'single-delivery-orders',
    component: SingleDeliveryOrdersComponent
  },
  {
    path: 'multiple-delivery-orders',
    component: MultipleDeliveryOrdersComponent
  },
  {
    path: 'create-single-order',
    component: CreateSingleOrderComponent
  },
  {
    path: 'create-multiple-orders',
    component: CreateMultipleOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagerRoutingModule { }
