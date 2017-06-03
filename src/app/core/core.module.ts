import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialProviderModule } from './social-provider/social-provider.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    SocialProviderModule
  ],
  exports: [
    SocialProviderModule
  ],
  declarations: []
})
export class CoreModule { }
