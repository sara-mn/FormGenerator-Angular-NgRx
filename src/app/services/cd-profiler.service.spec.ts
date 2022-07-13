import { TestBed } from '@angular/core/testing';

import { CdProfilerService } from './cd-profiler.service';

describe('CdProfilerService', () => {
  let service: CdProfilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdProfilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
