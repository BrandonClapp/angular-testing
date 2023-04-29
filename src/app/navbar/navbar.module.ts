import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    // NOTE - We don't need to import FeatureModule here because it's decalred with {providedIn: 'root'}
    // which means it's available everywhere in the app without importing it
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
