import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule, MdToolbarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowseDialogComponent } from './browse-dialog/browse-dialog.component';
import { VirtualScrollModule } from 'od-virtualscroll';
import { VirtualScrollService } from './virtual-scroll.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HomeRoutingModule,
    VirtualScrollModule,
    MdListModule,
    MdDialogModule,
    MdInputModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule
  ],
  declarations: [HomeComponent, BrowseDialogComponent],
  entryComponents: [BrowseDialogComponent],
  providers: [VirtualScrollService]
})
export class HomeModule {
  constructor() {}
}
