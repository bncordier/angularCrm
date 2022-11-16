import { TestBed } from '@angular/core/testing';

import { DemoObservableService } from './demo-observable.service';

describe('DemoObservableService', () => {
  let service: DemoObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
