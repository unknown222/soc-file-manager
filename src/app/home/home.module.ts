import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule
  ],
  declarations: [ HomeComponent ],
  providers: []
})
export class HomeModule {
}
