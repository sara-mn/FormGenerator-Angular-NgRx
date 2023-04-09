import { TestBed } from '@angular/core/testing';

import { FormResolver } from './form.resolver';

describe('FormResolver', () => {
  let resolver: FormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
