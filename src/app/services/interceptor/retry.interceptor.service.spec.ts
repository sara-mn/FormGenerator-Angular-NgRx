import { TestBed } from '@angular/core/testing';

import { RetryInterceptorService } from './retry.interceptor.service';

describe('Retry.InterceptorService', () => {
  let service: RetryInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetryInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
