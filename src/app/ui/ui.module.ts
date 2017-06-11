import { NgModule } from '@angular/core';
import { SidenavPortalModule } from './sidenav-portal/sidenav-portal.module';

@NgModule({
  imports: [
    SidenavPortalModule
  ],
  exports: [
    SidenavPortalModule
  ],
  declarations: []
})
export class UiModule { }
