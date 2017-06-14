import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoUploadRoutingModule } from './photo-upload-routing.module';
import { PhotoUploadComponent } from './photo-upload.component';
import { VirtualScrollModule } from 'od-virtualscroll';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
  MdSnackBarModule,
  MdTabsModule
} from '@angular/material';
import { CreateUploadComponent } from './create-upload/create-upload.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { FormsModule } from '@angular/forms';
import { PhotoStorageBrowserComponent } from './create-upload/photo-storage-browser/photo-storage-browser.component';
import { TreeModule } from 'angular-tree-component';
import { PhotoScrollerComponent } from './create-upload/photo-scroller/photo-scroller.component';
import { PhotoUploadConfigsComponent } from './create-upload/photo-upload-configs/photo-upload-configs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PhotoUploadRoutingModule,
    VirtualScrollModule,
    TreeModule,
    MdIconModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    MdProgressBarModule,
    MdSnackBarModule
  ],
  declarations: [ PhotoUploadComponent, CreateUploadComponent, InProgressComponent, PhotoStorageBrowserComponent, PhotoScrollerComponent, PhotoUploadConfigsComponent ],
  entryComponents: [ PhotoStorageBrowserComponent ],
  providers: []
})
export class PhotoUploadModule {
}
