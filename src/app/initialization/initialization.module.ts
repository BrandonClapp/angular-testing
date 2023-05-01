import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitializationComponent } from './initialization.component';
import { InitializationService } from './initialization.service';

@NgModule({
  declarations: [InitializationComponent],
  imports: [CommonModule],
  providers: [InitializationService],
  exports: [InitializationComponent],
})
export class InitializationModule {}
