import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { ViewAllTransactionsComponent } from './components/view-all-transactions/view-all-transactions.component';
import { ViewWalletComponent } from './components/view-wallet/view-wallet.component';
import { BillingInformationComponent } from './components/billing-information/billing-information.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import { InvoiceFilterComponent } from './components/invoice-filter/invoice-filter.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {WalletService} from "./services/wallet.service";
import { InvoiceReceiptComponent } from './components/invoice-receipt/invoice-receipt.component';


@NgModule({
  declarations: [
    TransactionsComponent,
    ViewAllTransactionsComponent,
    ViewWalletComponent,
    BillingInformationComponent,
    InvoiceFilterComponent,
    InvoiceReceiptComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WalletService]
})
export class WalletModule { }
