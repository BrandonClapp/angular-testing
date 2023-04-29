import { Component } from '@angular/core';
import { FeatureService } from '../feature/feature.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public isHidden = false;

  constructor(featureService: FeatureService) {
    // Hide the navbar if this feature is enabled
    this.isHidden = featureService.isEnabled();
  }
}
