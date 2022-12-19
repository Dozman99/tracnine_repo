import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdPaymentComponent } from './ussd-payment.component';

describe('UssdPaymentComponent', () => {
  let component: UssdPaymentComponent;
  let fixture: ComponentFixture<UssdPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UssdPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
