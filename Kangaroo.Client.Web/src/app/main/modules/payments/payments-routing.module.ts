import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankPaymentComponent } from './bank-payment/bank-payment.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import {UssdPaymentComponent} from "./ussd-payment/ussd-payment.component";
import {CanProceedNextGuard} from "../../guards/can-proceed-next.guard";

export const COMPONENTS = [
  PaymentTypeComponent,
  BankPaymentComponent
]

const routes: Routes = [
  {
    path: '',
    component: PaymentTypeComponent,
    canDeactivate: [CanProceedNextGuard]
  },
  {
    path: 'bank-payment',
    component: BankPaymentComponent,
    canDeactivate: [CanProceedNextGuard]
  },
  {
    path: 'ussd-payment',
    component: UssdPaymentComponent,
    canDeactivate: [CanProceedNextGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
