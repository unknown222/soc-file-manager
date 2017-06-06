import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule, MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowseDialogComponent } from './browse-dialog/browse-dialog.component';
import { VirtualScrollModule } from 'od-virtualscroll';
import { VirtualScrollService } from './create-upload/virtual-scroll.service';
import { CreateAlbumDialogComponent } from './create-album-dialog/create-album-dialog.component';
import { CreateUploadComponent } from './create-upload/create-upload.component';
import { InProgressComponent } from './in-progress/in-progress.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HomeRoutingModule,
    VirtualScrollModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdInputModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdTabsModule
  ],
  declarations: [HomeComponent, BrowseDialogComponent, CreateAlbumDialogComponent, CreateUploadComponent, InProgressComponent],
  entryComponents: [BrowseDialogComponent, CreateAlbumDialogComponent],
  providers: [VirtualScrollService]
})
export class HomeModule {
  constructor() {}
}
