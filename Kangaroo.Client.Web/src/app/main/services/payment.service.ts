import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/api-response/api-response";
import {Payment} from "../models/payment/payment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  savePayment (data: Payment): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(`${environment.paymentApi}/Payment/Init`, data);
  }


}
