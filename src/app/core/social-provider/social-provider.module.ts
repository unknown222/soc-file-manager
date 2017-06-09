import { NgModule } from '@angular/core';
import { SocialProviderService } from './social-provider.service';
import { FacebookService } from 'ngx-facebook';
import { ApiFbProviderService } from './api-fb-provider.service';
import { HttpModule } from '@angular/http';
import { ApiVkProviderService } from './api-vk-provider.service';


@NgModule({
  imports: [HttpModule],
  declarations: [],
  providers: [ FacebookService, SocialProviderService, ApiFbProviderService, ApiVkProviderService ]
})
export class SocialProviderModule {
}
