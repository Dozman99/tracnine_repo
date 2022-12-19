import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS, PaymentsRoutingModule } from './payments-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UssdPaymentComponent } from './ussd-payment/ussd-payment.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    ...COMPONENTS,
    UssdPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PaymentsModule { }
