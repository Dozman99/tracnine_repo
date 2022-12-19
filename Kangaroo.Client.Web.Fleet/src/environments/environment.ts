// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '',
  maps_API: 'AIzaSyCOhf7Xurm3gijyt94O7qxOqGuhA99WfTU',
  orderApi: 'https://api-order-dev-kangaroo.azurewebsites.net/api',
  shippingApi: 'https://api-shipping-dev-kangaroo.azurewebsites.net/api',
  commonApi: 'https://api-common-dev-kangaroo.azurewebsites.net/api',
  authApi: 'https://api-identity-dev-kangaroo.azurewebsites.net/api',
  coreApi: 'https://api-core-a-dev-kangaroo.azurewebsites.net/api',
  firebaseConfig: {
    apiKey: "AIzaSyBJelXC5e67eCi2x-VW53Vz1j-Vbj3ZIGw",
    authDomain: "kangaroo-identity-dev.firebaseapp.com",
    databaseURL: 'https://kangaroo-identity-dev.firebaseio.com',
    projectId: "kangaroo-identity-dev",
    storageBucket: "kangaroo-identity-dev.appspot.com",
    messagingSenderId: "884460175301",
    appId: "1:884460175301:web:3b1d8aba465f4cdcc495ac",
    measurementId: "G-K3SJQ9Z983"
  },
  companyId: 'd718c770-fa4b-460d-b67e-f1b7198d53a0',
  companyLocationId: '6ded1d3e-70e1-4116-90d8-63208e3c855d'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
