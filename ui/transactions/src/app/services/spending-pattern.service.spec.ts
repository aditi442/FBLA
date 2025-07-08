import { TestBed } from '@angular/core/testing';

import { SpendingPatternService } from './spending-pattern.service';

describe('SpendingPatternService', () => {
  let service: SpendingPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendingPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
