import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCalculatorComponent } from './delivery-calculator.component';

describe('DeliveryCalculatorComponent', () => {
  let component: DeliveryCalculatorComponent;
  let fixture: ComponentFixture<DeliveryCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
