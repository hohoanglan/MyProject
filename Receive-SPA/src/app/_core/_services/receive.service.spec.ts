/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReceiveService } from './receive.service';

describe('Service: Receive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiveService]
    });
  });

  it('should ...', inject([ReceiveService], (service: ReceiveService) => {
    expect(service).toBeTruthy();
  }));
});
