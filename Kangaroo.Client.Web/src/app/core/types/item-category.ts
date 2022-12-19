import { HttpResponseInterface } from "./http-response";

export interface ItemCategoryInterface {
  categoryDetails: [],
  description: string,
  id: string,
  isActive: boolean,
  narration: string
}

export interface ItemCategoryHttpResponseInterface extends HttpResponseInterface {
  data: ItemCategoryInterface[]
}

export interface ProductItemsInterface {
  description: string,
  id: string,
  isFragile: boolean,
  narration: any
}

export interface ProductItemsInterfaceHttpResponse extends HttpResponseInterface {
  data: ProductItemsInterface[]
}
