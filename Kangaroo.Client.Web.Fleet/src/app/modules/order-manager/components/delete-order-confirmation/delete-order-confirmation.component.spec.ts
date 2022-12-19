import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderConfirmationComponent } from './delete-order-confirmation.component';

describe('DeleteOrderConfirmationComponent', () => {
  let component: DeleteOrderConfirmationComponent;
  let fixture: ComponentFixture<DeleteOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
