import { TestBed, inject } from '@angular/core/testing';

import { SocialProviderService } from './social-provider.service';

describe('SocialProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialProviderService]
    });
  });

  it('should be created', inject([SocialProviderService], (service: SocialProviderService) => {
    expect(service).toBeTruthy();
  }));
});
