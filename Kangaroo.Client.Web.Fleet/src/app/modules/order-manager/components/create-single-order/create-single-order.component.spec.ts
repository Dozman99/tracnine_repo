import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleOrderComponent } from './create-single-order.component';

describe('CreateSingleOrderComponent', () => {
  let component: CreateSingleOrderComponent;
  let fixture: ComponentFixture<CreateSingleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSingleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
