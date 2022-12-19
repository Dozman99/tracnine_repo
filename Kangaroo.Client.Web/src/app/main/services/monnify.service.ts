import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MonnifyService {

  paymentAvailable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadScript().then(r => {});
  }

  loadScript(): Promise<void> {
    return new Promise(resolve => {
      const script = window.document.createElement('script');
      window.document.head.appendChild(script);
      const onLoadFunc = () => {
        script.removeEventListener('load', onLoadFunc);
        resolve();
      };
      script.addEventListener('load', onLoadFunc);
      script.setAttribute('src', 'https://sdk.monnify.com/plugin/monnify.js');
      this.paymentAvailable.next(true);
    });
  }
}
