import { TestBed } from '@angular/core/testing';

import { CanProceedNextGuard } from './can-proceed-next.guard';

describe('CanProceedNext', () => {
  let guard: CanProceedNextGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanProceedNextGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
