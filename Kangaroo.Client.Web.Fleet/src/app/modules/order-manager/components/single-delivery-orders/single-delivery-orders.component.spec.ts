import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDeliveryOrdersComponent } from './single-delivery-orders.component';

describe('SingleDeliveryOrdersComponent', () => {
  let component: SingleDeliveryOrdersComponent;
  let fixture: ComponentFixture<SingleDeliveryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDeliveryOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDeliveryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
