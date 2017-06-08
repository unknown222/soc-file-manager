import { TestBed, inject } from '@angular/core/testing';

import { InconRegisterService } from './icon-register.service';

describe('InconRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InconRegisterService]
    });
  });

  it('should be created', inject([InconRegisterService], (service: InconRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
