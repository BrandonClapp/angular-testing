import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { ObservablesModule } from './observables/observables.module';
import { InitializationModule } from './initialization/initialization.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NavbarModule,
    ObservablesModule,
    InitializationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
