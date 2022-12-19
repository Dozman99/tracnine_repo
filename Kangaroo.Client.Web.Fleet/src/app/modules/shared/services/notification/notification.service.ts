import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  publishMessage$: Subject<{message: string, type: string, duration: number}> = new Subject<{message: string, type: string, duration: number}>();

  constructor() { }

  publishMessage(message: string, type: string, duration: number) {
    this.publishMessage$.next({message, type, duration});
  }
}
