import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {PricingCalculator} from "../models/pricing-calculator/pricing-calculator";
import {ApiResponse} from "../models/api-response/api-response";
import {Order} from "../models/order/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: BehaviorSubject<Order> = new BehaviorSubject<any>({
    "customerId": "00000000-0000-0000-0000-000000000000",
    "description": "",
    "isReturnOrder": true,
    "note": "string",
    "coupon": "string",
    "couponAmount": 0,
    "amount": 0,
    "percentDiscount": 0,
    "discountAmount": 0,
    "netAmount": 0,
    "details": [
      {
        "itemCategoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "itemCategoryDetailId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "description": "string",
        "isFragile": true,
        "weight": 0,
        "unitOfMeasureId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "amount": 0,
        "deliverToFirstName": "string",
        "deliverToLastName": "string",
        "deliverToPhoneNumber": "+2348038582832",
        "deliverToLongitude": 7.879,
        "deliverToLatitude": 25.8976,
        "deliverToEmail": "string",
        "deliverToAddress1": "string",
        "deliverToAddress2": "string",
        "deliverToLGA": "string",
        "deliverToCity": "string",
        "deliverToAddressState": "string",
        "deliverToAddressCountry": "string",
        "deliverToPostalCode": "string",
        "deliverToAddressNearestLandmark": "string",
        "deliverToAddressNearestBustop": "string",
        "note": "string"
      }
    ],
    "deliveryDetail": {
      "customerFirstName": "string",
      "customerLastName": "string",
      "customerPhoneNumber": "string",
      "customerEmail": "string",
      "customerAddress1": "string",
      "customerAddress2": "string",
      "customerLGA": "string",
      "customerCity": "string",
      "customerAddressState": "string",
      "customerAddressCountry": "string",
      "customerPostalCode": "string",
      "customerAddressNearestLandmark": "string",
      "customerAddressNearestBustop": "string",
      "customerAddressLongitude": 4.112233,
      "customerAddressLatitude": 27.225577,
      "deliveryType": 0,
      "deliveryOption": 0,
      "deliveryVehicleType": 0
    }
  });
  price!: BehaviorSubject<PricingCalculator>

  constructor(
    private http: HttpClient
  ) {
    let lsData = localStorage.getItem('order');

    if (lsData != null) {
      let order: Order = JSON.parse(lsData) ;
      this.order.next(order);
    }
  }

  setOrder(data: Order): void {
    let newData = {...this.order.value, ...data}
    localStorage.setItem('order', JSON.stringify(newData));
    this.order.next(newData);
  }

  getItem(id: string): Observable<any> {
    return this.http.get(`${environment.shippingApi}/tracker/GetItem/${id}`);
  }

  getPrice(data: PricingCalculator): void {
    this.http.post<ApiResponse<PricingCalculator>>(`${environment.shippingApi}`, data)
      .subscribe(response => {
        this.price.next(response.data);
      });
  }

  createOrder (data: Order): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${environment.orderApi}/order/Create`, data);
  }

  cancelOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/Cancel/${id}`, {});
  }

  completeOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/Complete/${id}`, {});
  }

  activateOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/Activate/${id}`, {});
  }

  deactivateOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/Deactivate/${id}`, {});
  }

  archiveOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/Archive/${id}`, {});
  }

  restoreOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/Restore/${id}`, {});
  }

  deleteOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${environment.orderApi}/order/Delete/${id}`, {});
  }

  getOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.orderApi}/order/GetItem/${id}`);
  }

  isCompletedOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/IsCompleted/${id}`, {});
  }

  isPaidOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.orderApi}/order/IsPaid/${id}`, {});
  }

  trackOrder (id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.shippingApi}/tracker/GetAll/${id}`);
  }

}
