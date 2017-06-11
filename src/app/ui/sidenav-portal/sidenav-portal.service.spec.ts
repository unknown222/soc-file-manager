import { TestBed, inject } from '@angular/core/testing';

import { SidenavPortalService } from './sidenav-portal.service';

describe('SidenavPortalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavPortalService]
    });
  });

  it('should be created', inject([SidenavPortalService], (service: SidenavPortalService) => {
    expect(service).toBeTruthy();
  }));
});
