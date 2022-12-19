import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanLeavePageNotificationComponent } from './can-leave-page-notification.component';

describe('CanLeavePageNotificationComponent', () => {
  let component: CanLeavePageNotificationComponent;
  let fixture: ComponentFixture<CanLeavePageNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanLeavePageNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanLeavePageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
