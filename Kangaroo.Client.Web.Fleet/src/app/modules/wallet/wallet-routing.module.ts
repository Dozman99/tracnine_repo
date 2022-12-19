import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewAllTransactionsComponent} from "./components/view-all-transactions/view-all-transactions.component";
import {ViewWalletComponent} from "./components/view-wallet/view-wallet.component";

const routes: Routes = [
  {
    path: '',
    component: ViewWalletComponent
  },
  {
    path: 'view-all-transactions',
    component: ViewAllTransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
