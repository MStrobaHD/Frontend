/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VerdictService } from './verdict.service';

describe('Service: VerdictService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerdictService]
    });
  });

  it('should ...', inject([VerdictService], (service: VerdictService) => {
    expect(service).toBeTruthy();
  }));
});
