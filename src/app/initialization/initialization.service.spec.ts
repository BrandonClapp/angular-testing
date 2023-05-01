import { TestBed } from '@angular/core/testing';

import { InitializationService } from './initialization.service';

describe('InitializationService', () => {
  let service: InitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitializationService],
    });
    service = TestBed.inject(InitializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 42', () => {
    expect(service.getValue()).toBe(42);
  });
});
