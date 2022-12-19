import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypeComponent } from './delivery-type.component';

describe('DeliveryTypeComponent', () => {
  let component: DeliveryTypeComponent;
  let fixture: ComponentFixture<DeliveryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
