import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { MdButtonModule, MdTooltipModule, MdMenuModule, MdProgressSpinnerModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { ProviderStatusComponent } from './header/provider-status/provider-status.component';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProviderStatusComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MdToolbarModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdMenuModule,
    MdSidenavModule,
    MdTooltipModule,
    UiModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
