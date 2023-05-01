import { Component, OnInit } from '@angular/core';
import { InitializationService } from './initialization.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-initialization',
  templateUrl: './initialization.component.html',
  styleUrls: ['./initialization.component.css'],
})
export class InitializationComponent implements OnInit {
  // Question: Is the InitializationService available at this point?
  // Answer: Yes, it is available.
  // Question: How do you know?
  // Answer: Because the InitializationService is injected into the constructor and the constructor is called
  //         when the component is created, prior to the ngOnInit lifecycle hook, prior to field initialization.
  public value1 = this.initializationService.getValue();

  // In Angular, the getters are called whenever Angular's change detection mechanism runs.
  // This happens when an event is triggered, a promise is resolved, or an Observable emits a new value,
  // among other things. The change detection mechanism checks the expressions in the templates of the components
  // and their child components to see if any of them have changed. If a change is detected, Angular updates the
  // view accordingly by re-rendering the component and its children. Therefore, the getter will be called as many
  // times as the change detection mechanism runs. It is important to ensure that getters do not perform heavy
  // computation or have side effects to avoid performance issues.
  get value2(): number {
    console.log('New value is being calculated due to change detection.');
    return this.initializationService.getValue();
  }

  // DO NOT DO THIS!
  // This will create a new Observable every time the getter is called, which is every time the change detection
  // mechanism runs, resulting in a [potential - Angular may clean these up somehow?] memory leak due to a new
  // subscription being created every time the getter is called.
  get value3$(): BehaviorSubject<number> {
    return new BehaviorSubject(this.initializationService.getValue());
  }

  // A field can be initialized with a default value and then set in the ngOnInit lifecycle hook.
  // This has to also be typed | undefined because it will not be initialized until the ngOnInit lifecycle hook
  public value4: number | undefined;

  // A field can be initialized with a default value and then set in the constructor,
  // but it's easier to just declare and initialize the field inline, like value1.
  public value5: number;

  ngOnInit(): void {
    this.value4 = this.initializationService.getValue();
  }

  constructor(public initializationService: InitializationService) {
    this.value5 = this.initializationService.getValue();
  }
}
