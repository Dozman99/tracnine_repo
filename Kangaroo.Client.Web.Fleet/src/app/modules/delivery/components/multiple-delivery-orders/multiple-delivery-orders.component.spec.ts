import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDeliveryOrdersComponent } from './multiple-delivery-orders.component';

describe('MultipleDeliveryOrdersComponent', () => {
  let component: MultipleDeliveryOrdersComponent;
  let fixture: ComponentFixture<MultipleDeliveryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleDeliveryOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDeliveryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
