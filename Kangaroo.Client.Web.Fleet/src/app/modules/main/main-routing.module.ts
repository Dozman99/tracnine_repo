import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../delivery/components/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'delivery',
        loadChildren: () => import('../delivery/delivery.module').then(m => m.DeliveryModule)
      },
      {
        path: 'fleet-manager',
        loadChildren: () => import('../fleet-manager/fleet-manager.module').then(m => m.FleetManagerModule)
      },
      {
        path: 'order-manager',
        loadChildren: () => import('../order-manager/order-manager.module').then(m => m.OrderManagerModule)
      },
      {
        path: 'billing',
        loadChildren: () => import('../billing/billing.module').then(m => m.BillingModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('../wallet/wallet.module').then(m => m.WalletModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: '',
        redirectTo: 'main/fleet-manager',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
