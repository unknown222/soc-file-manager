import { SidenavPortalModule } from './sidenav-portal.module';

describe('SidenavPortalModule', () => {
  let sidenavPortalModule: SidenavPortalModule;

  beforeEach(() => {
    sidenavPortalModule = new SidenavPortalModule();
  });

  it('should create an instance', () => {
    expect(sidenavPortalModule).toBeTruthy();
  });
});
