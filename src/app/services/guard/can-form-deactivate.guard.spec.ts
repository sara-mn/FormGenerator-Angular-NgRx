import { TestBed } from '@angular/core/testing';

import { CanFormDeactivateGuard } from './can-form-deactivate.guard';

describe('CanFormDeactivateGuard', () => {
  let guard: CanFormDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanFormDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
