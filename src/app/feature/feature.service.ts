import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor() {}

  isEnabled(): boolean {
    return true;
  }
}
