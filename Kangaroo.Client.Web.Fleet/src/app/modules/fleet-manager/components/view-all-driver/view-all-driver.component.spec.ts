import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllDriverComponent } from './view-all-driver.component';

describe('ViewAllDriverComponent', () => {
  let component: ViewAllDriverComponent;
  let fixture: ComponentFixture<ViewAllDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
