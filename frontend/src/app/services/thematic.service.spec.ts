/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThematicService } from './thematic.service';

describe('Service: Thematic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThematicService]
    });
  });

  it('should ...', inject([ThematicService], (service: ThematicService) => {
    expect(service).toBeTruthy();
  }));
});
