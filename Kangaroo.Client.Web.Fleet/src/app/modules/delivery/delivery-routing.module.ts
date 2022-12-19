import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MultipleDeliveryOrdersComponent } from './components/multiple-delivery-orders/multiple-delivery-orders.component';
import { SingleDeliveryOrdersComponent } from './components/single-delivery-orders/single-delivery-orders.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
},
{
  path: 'single-delivery-orders',
  component: SingleDeliveryOrdersComponent
},
{
  path: 'multiple-delivery-orders',
  component: MultipleDeliveryOrdersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
