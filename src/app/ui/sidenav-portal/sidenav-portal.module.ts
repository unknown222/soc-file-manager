import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavPortalComponent } from './sidenav-portal.component';
import { SidenavPortalService } from './sidenav-portal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SidenavPortalComponent],
  exports: [SidenavPortalComponent],
  providers: [SidenavPortalService]
})
export class SidenavPortalModule { }
