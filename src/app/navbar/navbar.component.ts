import { Component, Inject } from '@angular/core';
import { FeatureService } from '../feature/feature.service';

const MY_INJECTION_TOKEN = 'MY_INJECTION_TOKEN';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

  // Example of providing a dependency injection token with a value
  providers: [{ provide: MY_INJECTION_TOKEN, useValue: 'Hello Token' }],
})
export class NavbarComponent {
  public isHidden = false;

  constructor(
    // Example of injecting a dependency injection token by using the @Inject decorator
    @Inject(MY_INJECTION_TOKEN) public tokenValue: string,
    featureService: FeatureService
  ) {
    // Hide the navbar if this feature is enabled
    this.isHidden = featureService.isEnabled();
  }
}
