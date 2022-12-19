import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanProceedNextGuard} from "./guards/can-proceed-next.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'delivery-type',
    loadChildren: () => import('./modules/delivery-type/delivery-type.module').then(m => m.DeliveryTypeModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./modules/order-details/order-details.module').then(m => m.OrderDetailsModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'delivery-tracker',
    loadChildren: () => import('./modules/delivery-tracker/delivery-tracker.module').then(m => m.DeliveryTrackerModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
