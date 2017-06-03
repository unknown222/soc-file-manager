import { NgModule } from '@angular/core';
import { SocialProviderService } from './social-provider.service';
import { FacebookService } from 'ngx-facebook';
import { ApiFbProviderService } from './api-fb-provider.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [ FacebookService, SocialProviderService, ApiFbProviderService ]
})
export class SocialProviderModule {
}
