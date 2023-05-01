import { Injectable } from '@angular/core';

@Injectable()
export class InitializationService {
  getValue(): number {
    return 42;
  }
}
