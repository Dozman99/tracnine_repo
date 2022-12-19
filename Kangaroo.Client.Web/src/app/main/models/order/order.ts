import {OrderDetail} from "./order-detail";
import {DeliveryDetail} from "./delivery-detail";

export class Order {
  id?: string;
  customerId?: string;
  description?: string;
  isReturnOrder?: boolean;
  trackingId?: string;
  note?: string;
  coupon?: string;
  couponAmount?: string;
  amount?: number;
  percentDiscount?: number;
  discountAmount?: number;
  netAmount?: number;
  details?: OrderDetail[];
  deliveryDetail?: DeliveryDetail;
}
