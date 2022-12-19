import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyLocationComponent } from './create-company-location.component';

describe('CreateCompanyLocationComponent', () => {
  let component: CreateCompanyLocationComponent;
  let fixture: ComponentFixture<CreateCompanyLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanyLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
