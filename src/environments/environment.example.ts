// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  fbAppConfig: {
    initParams: {
      appId: 'xxxxxxxxxxxx',
      xfbml: true,
      version: 'v2.9'
    },
    loginOptions: {
      scope: 'public_profile,user_photos,pages_show_list,publish_actions,user_managed_groups',
      return_scopes: true,
      enable_profile_selector: true
    }
  }
};
