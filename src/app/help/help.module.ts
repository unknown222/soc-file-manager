import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { MdCardModule, MdIconModule, MdListModule, MdSidenavModule } from '@angular/material';
import { UploadPhotosGuideComponent } from './upload-photos-guide/upload-photos-guide.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdCardModule
  ],
  declarations: [HelpComponent, UploadPhotosGuideComponent]
})
export class HelpModule { }
