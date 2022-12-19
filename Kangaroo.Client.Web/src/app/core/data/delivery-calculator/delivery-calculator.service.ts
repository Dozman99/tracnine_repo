import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryCalculatorService {
  delivery = [
    {
      "deliveryEta": "0 - 8 hours"
    },
    {
      "deliveryEta": "0 - 3 hours"
    }
  ]
  
  constructor(
    private http: HttpClient
  ) { }

  calculateDelivery(data: any) {
    return this.http.post(`${environment.shippingApi}/pricing-calculator/calculate`, data)
  }
}
