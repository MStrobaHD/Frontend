import { TestBed } from '@angular/core/testing';

import { AlgorithmTaskService } from './algorithm-task.service';

describe('AlgorithmTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlgorithmTaskService = TestBed.get(AlgorithmTaskService);
    expect(service).toBeTruthy();
  });
});
