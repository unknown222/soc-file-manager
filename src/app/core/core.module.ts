import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialProviderModule } from './social-provider/social-provider.module';
import { AuthModule } from './auth/auth.module';
import { WorkerModule } from './worker/worker.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    SocialProviderModule,
    WorkerModule
  ],
  exports: [
    SocialProviderModule
  ],
  declarations: []
})
export class CoreModule { }
