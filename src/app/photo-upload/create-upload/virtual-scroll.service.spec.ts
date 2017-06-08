import { TestBed, inject } from '@angular/core/testing';

import { VirtualScrollService } from './virtual-scroll.service';

describe('VirtualScrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VirtualScrollService]
    });
  });

  it('should be created', inject([VirtualScrollService], (service: VirtualScrollService) => {
    expect(service).toBeTruthy();
  }));
});
