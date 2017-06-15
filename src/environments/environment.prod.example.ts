import { Environment } from './environment.interface';
export const environment: Environment = {
  production: true,
  fbAppConfig: {
    initParams: {
      appId: 'XXXXXXXXXXXXXXXXXXXXXXXX',
      xfbml: true,
      version: 'v2.9'
    },
    loginOptions: {
      scope: 'public_profile,user_photos,publish_actions,user_managed_groups',
      return_scopes: true,
      enable_profile_selector: true
    }
  },

  vkAppConfig: {
    initParams: {
      apiId: 99999999999999,
      status: false,
      onlyWidgets: false
    },
    loginOptions: 4+262144
  },
  gitConfig: {
    gitProjectUrl: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  }
};
