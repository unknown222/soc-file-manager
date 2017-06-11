import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular/material';
import { TestComponent } from './test/test.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
        HomeRoutingModule,
    MdButtonModule
  ],
  declarations: [ HomeComponent, TestComponent ],
  entryComponents: [ TestComponent ],
  providers: []
})
export class HomeModule {
}
