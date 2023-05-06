import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { InitializationComponent } from './initialization/initialization.component';
import { ObservablesComponent } from './observables/observables.component';
import { NavbarModule } from './navbar/navbar.module';
import { ObservablesModule } from './observables/observables.module';
import { InitializationModule } from './initialization/initialization.module';

// sets up routes constant where you define your routes
const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'initialization', component: InitializationComponent },
  { path: 'observables', component: ObservablesComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NavbarModule,
    ObservablesModule,
    InitializationModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
