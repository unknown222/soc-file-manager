import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { MdButtonModule, MdIconModule, MdMenuModule, MdProgressSpinnerModule, MdToolbarModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { ProviderStatusComponent } from './header/provider-status/provider-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProviderStatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    MdToolbarModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdMenuModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
