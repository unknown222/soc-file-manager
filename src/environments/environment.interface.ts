import { InitParams, LoginOptions } from 'ngx-facebook';
/**
 * Created by Unknown on 6/7/2017.
 */
export interface Environment {
  production: true | false,
  fbAppConfig?: {
    initParams: InitParams;
    loginOptions: LoginOptions;
  };
  vkAppConfig?: {
    initParams: any
    loginOptions: any
  }
  gitConfig?: {
    gitProjectUrl: string
  }
}
