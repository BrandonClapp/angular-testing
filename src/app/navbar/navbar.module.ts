import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

@NgModule({
  // Declaring a component, directive, or pipe within a module makes it available for use within that module.
  declarations: [NavbarComponent],

  // Importing a module makes the exported declarations of that module available to the current module.
  imports: [
    CommonModule,
    // NOTE - We don't need to import FeatureModule here because it's decalred with {providedIn: 'root'}
    // which means it's available everywhere in the app without importing it
  ],

  // Providing a service (decorated with @Injectable()) within a module makes it available for use within
  // that module and its components, directives, and pipes via dependency injection.
  providers: [],

  // Exporting a component, directive, or pipe makes it available for use in other modules that import the exporting module.
  exports: [NavbarComponent],
})
export class NavbarModule {}
