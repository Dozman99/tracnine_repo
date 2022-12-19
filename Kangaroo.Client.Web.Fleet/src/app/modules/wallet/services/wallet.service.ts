import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {InvoiceFilterComponent} from "../components/invoice-filter/invoice-filter.component";
import {InvoiceReceiptComponent} from "../components/invoice-receipt/invoice-receipt.component";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private readonly modalDialog: MatDialog) { }

  openInvoiceFilterModal() {
    this.modalDialog.open(
      InvoiceFilterComponent,
      {
        height: '90vh',
        width: '50vh'
      }
    );
  }

  openInvoiceReceiptModal() {
    this.modalDialog.open(
      InvoiceReceiptComponent,
      {
        height: 'auto',
        width: 'auto'
      }
    );
  }
}
