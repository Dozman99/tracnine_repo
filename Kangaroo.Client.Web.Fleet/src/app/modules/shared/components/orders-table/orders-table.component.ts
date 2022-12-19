import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrderManagerService } from 'src/app/modules/order-manager/services/order-manager/order-manager.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;

  @Input()
  hasPaginator = false;

  @Input()
  totalCount = 0;

  @Input()
  dataSource: any;

  @Output()
  getOrders: EventEmitter<boolean> = new EventEmitter();
  
columns = ['Checkbox', 'Tracking ID.', 'Amount', 'Payment', 'Status'];

  constructor(
    private readonly orderService: OrderManagerService
  ) { }

  ngOnInit(): void {
  }

  selectOrder(event: any) {
    console.log(event)
  }

  showDetails(row: any) {
    this.orderService.openOrderDetailsModal(row).afterClosed()
    .subscribe(
      res => {
        if(res) {
          this.getOrders.emit(true);
        }
      }
    )
  }

  changePage(page: PageEvent) {
    // console.log(page)
    if(page.previousPageIndex !== undefined) {
      console.log(page)
      if(page.pageIndex > page.previousPageIndex) {
        this.pageIndex = page.pageIndex + 1;
      } else {
        if(page.pageIndex === 0) {
          this.pageIndex = 1;
        } else {
          this.pageIndex = page.pageIndex + 1;
        }
      }
    }
    this.pageSize = page.pageSize;
    
    this.getOrders.emit(true);
  }
}
