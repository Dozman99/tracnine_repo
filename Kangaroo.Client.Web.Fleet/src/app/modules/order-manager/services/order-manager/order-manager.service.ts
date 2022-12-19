import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ApiResponse } from 'src/app/modules/shared/models/api-response';
import { environment } from 'src/environments/environment';
import { DeleteOrderConfirmationComponent } from '../../components/delete-order-confirmation/delete-order-confirmation.component';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {
  baseApi = environment.orderApi;
  order: Subject<any> = new Subject();
  orders: Subject<any> = new Subject();
  orderDetailModal: MatDialogRef<OrderDetailsComponent> | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly modalDialog: MatDialog
  ) { }

  getItem(id: string) {
    this.http.get<ApiResponse<any>>(`${this.baseApi}/order/GetItem/${id}`)
    .pipe(
      retry(3)
    ).subscribe(
        (response: any) => {
          this.order.next(response);
        }
      );
  }

  getOrders(pageIndex: number, pageSize: number) {
    let  params = new HttpParams();
    params = params.append('PageIndex', pageIndex)
    params = params.append('PageSize', pageSize)
    this.http.get<ApiResponse<any>>(`${this.baseApi}/order/GetAll`, {params})
    .pipe(
      retry(3)
    ).subscribe(
        (response: any) => {
          this.orders.next(response);
        }
      );
  }

  deleteOrder = (id: string) => {
    return this.http.delete<ApiResponse<any>>(`${this.baseApi}/order/Delete/${id}`);
  }

  archiveOrder = (id: string) => {
    return this.http.post(`${this.baseApi}/order/Archive/${id}`, {})
  }

  openOrderDetailsModal(row: any) {
    this.orderDetailModal =  this.modalDialog.open(
      OrderDetailsComponent,
      {
        height: '80vh',
        width: '80vw',
        data: row
      }
      )

      return this.orderDetailModal
  }

  openConfirmationModal(id: string, action: string, method: any) {
    const modal = this.modalDialog.open(
      DeleteOrderConfirmationComponent,
      {
        height: '30vh',
        width: '30vw',
        data: {
          id,
          method,
          action
        }
      }
      )

      modal.afterClosed()
      .subscribe(
        res => {
          if(res) {
            if(this.orderDetailModal) {
              this.orderDetailModal.close(true);
            }
          }
        }
      )
  }
}
