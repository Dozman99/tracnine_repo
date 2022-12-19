import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCategoryHttpResponseInterface, ProductItemsInterfaceHttpResponse } from 'src/app/core/types/item-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllItemCategory(): Observable<ItemCategoryHttpResponseInterface> {
    return this.http.get<ItemCategoryHttpResponseInterface>(`${environment.commonApi}/item-category/GetAll`)
  }

  getCategoryProduct(id: string): Observable<ProductItemsInterfaceHttpResponse> {
    return this.http.get<ProductItemsInterfaceHttpResponse>(`${environment.commonApi}/item-category-detail/GetAll/${id}`)
  }
}
