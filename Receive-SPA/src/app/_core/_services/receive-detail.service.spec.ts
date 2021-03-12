/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReceiveDetailService } from './receive-detail.service';

describe('Service: ReceiveDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiveDetailService]
    });
  });

  it('should ...', inject([ReceiveDetailService], (service: ReceiveDetailService) => {
    expect(service).toBeTruthy();
  }));
});
