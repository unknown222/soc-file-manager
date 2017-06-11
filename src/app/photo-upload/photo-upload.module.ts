import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoUploadRoutingModule } from './photo-upload-routing.module';
import { PhotoUploadComponent } from './photo-upload.component';
import { VirtualScrollModule } from 'od-virtualscroll';
import { MdButtonModule, MdCardModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule, MdTabsModule } from '@angular/material';
import { BrowseDialogComponent } from './browse-dialog/browse-dialog.component';
import { CreateAlbumDialogComponent } from './create-album-dialog/create-album-dialog.component';
import { CreateUploadComponent } from './create-upload/create-upload.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { VirtualScrollService } from './create-upload/virtual-scroll.service';
import { FormsModule } from '@angular/forms';
import { PhotoStorageBrowserComponent } from './photo-storage-browser/photo-storage-browser.component';
import { TreeModule } from 'angular-tree-component';

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
    MdTabsModule
  ],
  declarations: [ PhotoUploadComponent, BrowseDialogComponent, CreateAlbumDialogComponent, CreateUploadComponent, InProgressComponent, PhotoStorageBrowserComponent ],
  entryComponents: [ BrowseDialogComponent, CreateAlbumDialogComponent, PhotoStorageBrowserComponent ],
  providers: [ VirtualScrollService ]
})
export class PhotoUploadModule {
}
