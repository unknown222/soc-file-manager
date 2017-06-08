import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialProviderModule } from './social-provider/social-provider.module';
import { WorkerModule } from './worker/worker.module';
import { IconRegisterService } from './icon-register.service';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SocialProviderModule,
    WorkerModule,
    MdIconModule
  ],
  exports: [
    MdIconModule,
    SocialProviderModule
  ],
  declarations: [],
  providers: [ IconRegisterService ]
})
export class CoreModule {
  constructor(iconRegister: IconRegisterService) {
    iconRegister.registerExternalIcons();
  }
}
