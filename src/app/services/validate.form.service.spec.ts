import { TestBed } from '@angular/core/testing';

import { Validate.FormService } from './validate.form.service';

describe('Validate.FormService', () => {
  let service: Validate.FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Validate.FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
