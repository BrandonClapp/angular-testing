import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NavbarModule, FooterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
