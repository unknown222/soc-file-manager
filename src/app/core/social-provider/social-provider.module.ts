import { NgModule } from '@angular/core';
import { SocialProviderService } from './social-provider.service';
import { FacebookService } from 'ngx-facebook';
import { ApiFbProviderService } from './api-fb-provider.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [HttpModule],
  declarations: [],
  providers: [ FacebookService, SocialProviderService, ApiFbProviderService ]
})
export class SocialProviderModule {
}
