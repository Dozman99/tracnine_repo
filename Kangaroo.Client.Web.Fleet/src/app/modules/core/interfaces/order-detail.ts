export class OrderDetail {
  itemCategoryId?: string;
  itemCategoryDetailId?: string;
  deliveryPackageTypeId?: string;
  description?: string;
  isFragile?: true;
  weight?: number;
  unitOfMeasureId?: string;
  amount?: number;
  pickUp?: any;
  dropOff?: any;
  quantity?: number;
  deliverToFirstName?: string;
  deliverToLastName?: string;
  deliverToPhoneNumber?: string;
  deliverToEmail?: string;
  deliverToAddress1?: string;
  deliverToAddress2?: string;
  deliverToLGA?: string;
  deliverToCity?: string;
  deliverToAddressState?: string;
  deliverToAddressCountry?: string;
  deliverToPostalCode?: string;
  deliverToAddressNearestLandmark?: string;
  deliverToAddressNearestBustop?: string;
  note?: string;
}
