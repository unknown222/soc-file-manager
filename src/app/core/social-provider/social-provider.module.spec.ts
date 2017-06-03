import { SocialProviderModule } from './social-provider.module';

describe('SocialProviderModule', () => {
  let socialProviderModule: SocialProviderModule;

  beforeEach(() => {
    socialProviderModule = new SocialProviderModule();
  });

  it('should create an instance', () => {
    expect(socialProviderModule).toBeTruthy();
  });
});
