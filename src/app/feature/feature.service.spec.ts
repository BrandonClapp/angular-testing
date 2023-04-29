import { TestBed } from '@angular/core/testing';

import { FeatureService } from './feature.service';

describe('FeatureService', () => {
  let service: FeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // Service is registered in root, so we don't need to provide it
    service = TestBed.inject(FeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true', () => {
    expect(service.isEnabled()).toBe(true);
  });
});
