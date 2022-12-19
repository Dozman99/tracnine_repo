export class RoutePath {
  static readonly AUTHENTICATION_LOGIN = '/login';

  static readonly OVERVIEW = '/overview';

  static readonly FLEET = 'fleets';
  static readonly FLEET_DRIVER = 'fleets/drivers';
  static readonly FLEET_VEHICLE = 'fleets/vehicles';

  static readonly ORDER = 'orders';
  static readonly ORDER_SINGLE_DELIVERY = 'orders/single-delivery';
  static readonly ORDER_MULTIPLE_DELIVERY = 'orders/multiple-delivery';
  static readonly ORDER_FORM_SINGLE = 'orders/single/create';
  static readonly ORDER_FORM_MULTIPLE = 'orders/multiple/create';
  static readonly ORDER_SUMMARY = 'orders/summary';
  static readonly ORDER_PAYMENT = 'orders/payment';
  static readonly ORDER_COMPLETE = 'orders/complete';

  static readonly WALLET = 'wallets';
  static readonly WALLET_TRANSACTIONS = 'wallets';
  static readonly WALLET_INVOICE = 'wallets/invoice';

  static readonly SETTING = 'settings';
  static readonly SETTING_ACCOUNT = 'settings/accounts';
  static readonly SETTING_SECURITY = 'settings/security';

}
