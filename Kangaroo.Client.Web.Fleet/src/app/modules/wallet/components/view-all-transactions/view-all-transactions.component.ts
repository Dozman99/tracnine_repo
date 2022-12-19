import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-view-all-transactions',
  templateUrl: './view-all-transactions.component.html',
  styleUrls: ['./view-all-transactions.component.scss']
})
export class ViewAllTransactionsComponent implements OnInit {
  invoiceColumns = ['checkbox', 'trackingId', 'invoiceNumber', 'amountPaid', 'date', 'status'];
  invoiceDataSource = [
    {
      trackingId: 'KSD0000031',
      invoiceNumber: '#IN-415646',
      amountPaid: '₦1,520',
      date: new Date(),
      status: 'Delivered'
    },
    {
      trackingId: 'KSD0000031',
      invoiceNumber: '#IN-415646',
      amountPaid: '₦1,520',
      date: new Date(),
      status: 'Delivered'
    },
    {
      trackingId: 'KSD0000031',
      invoiceNumber: '#IN-415646',
      amountPaid: '₦1,520',
      date: new Date(),
      status: 'Delivered'
    },
    {
      trackingId: 'KSD0000031',
      invoiceNumber: '#IN-415646',
      amountPaid: '₦1,520',
      date: new Date(),
      status: 'Delivered'
    },
    {
      trackingId: 'KSD0000031',
      invoiceNumber: '#IN-415646',
      amountPaid: '₦1,520',
      date: new Date(),
      status: 'Delivered'
    },
    {
      trackingId: 'KSD0000031',
      invoiceNumber: '#IN-415646',
      amountPaid: '₦1,520',
      date: new Date(),
      status: 'Delivered'
    },
    {
      trackingId: 'KSD0000031',
      invoiceNumber: '#IN-415646',
      amountPaid: '₦1,520',
      date: new Date(),
      status: 'Delivered'
    }
  ];

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
  }

  openFilterModal() {
    this.walletService.openInvoiceFilterModal();
  }

  openInvoiceReceiptModal() {
    this.walletService.openInvoiceReceiptModal();
  }
}
