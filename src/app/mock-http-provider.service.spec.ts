import { TestBed } from '@angular/core/testing';

import { MockHttpProviderService } from './mock-http-provider.service';

describe('MockHttpProviderService', () => {
  let service: MockHttpProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockHttpProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
