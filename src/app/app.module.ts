import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { ObservablesModule } from './observables/observables.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NavbarModule, ObservablesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
