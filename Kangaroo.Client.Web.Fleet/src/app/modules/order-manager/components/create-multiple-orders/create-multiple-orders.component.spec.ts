import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultipleOrdersComponent } from './create-multiple-orders.component';

describe('CreateMultipleOrdersComponent', () => {
  let component: CreateMultipleOrdersComponent;
  let fixture: ComponentFixture<CreateMultipleOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMultipleOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMultipleOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
