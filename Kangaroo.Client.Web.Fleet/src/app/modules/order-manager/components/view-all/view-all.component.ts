import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { OrderManagerService } from '../../services/order-manager/order-manager.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild(MatPaginator) paginator: MatPaginator | any;
columns = ['Checkbox', 'Tracking ID.', 'Amount', 'Payment', 'Status'];
dataSource = new MatTableDataSource();
subscription$ = new Subscription;
totalCount = 0;
pageIndex = 1;
pageSize = 10;
loading = true;

  constructor(
    private readonly orderService: OrderManagerService
  ) { }

  ngOnInit(): void {
    this.subscription$ = this.orderService.orders.subscribe(
      res => {
          this.loading = false;
        if(res['success']) {
          this.totalCount = res['data']['totalCount'];
          this.dataSource = new MatTableDataSource(res['data']['items']);
        }
      }
    )
    this.getOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
      
  }

  getOrders() {
    this.loading = true;
    this.orderService.getOrders(this.pageIndex, this.pageSize);
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
    
    this.getOrders()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
}

showDetails(row: any) {
  this.orderService.openOrderDetailsModal(row).afterClosed()
  .subscribe(
    res => {
      if(res) {
        this.getOrders();
      }
      
    }
  )
}

selectOrder(event: any) {
  console.log(event)
}

}
