import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  scan,
} from 'rxjs';

/**
 * Experimenting with observable types
 */

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css'],
})
export class ObservablesComponent implements OnInit {
  // Observable is a representation of any set of values over any amount of time.
  // With the base Observable class, you cannot emit new values to subscribers,
  // instead, you would use a Subject or a sub-class of Subject.
  // This is subscribed to from the template using the async pipe
  public copyrightYear$: Observable<number> = new Observable<number>(
    (observer) => {
      observer.next(new Date().getFullYear());
    }
  );

  // Subject is an abstraction of Observable that allows values to be multicasted to many Observers.
  // A Subject does not have an initial value and subscribers will not receive a value until one is emitted.
  // It does not emit null, only future emissions.
  public buttonClicked$: Subject<boolean> = new Subject<boolean>();

  // BehaviorSubject is a type of Subject that requires an initial value and emits its current value whenever
  // it is subscribed to. Because of this, it supports "late subscribers", or subscribers that subscribe after
  // the BehaviorSubject has emitted a value.
  // While the BehaviorSubject will emit it's value to late subscribers, it will not emit to late subscribers if it is already completed.
  // See: https://stackoverflow.com/questions/43118769/subject-vs-behaviorsubject-vs-replaysubject-in-angular
  // See test: 'a BehaviorSubject will not emit any values after it has been completed'
  public showSupportButton$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // ReplaySubject is a type of Subject that records multiple values from its observable and replays them to new subscribers.
  // The ReplaySubject emits each stored value to new subscribers, even those from before the subscription started.
  // Note that this does not mean it's an array of 5 values, it means it will replay the last 5 values.
  messages$: ReplaySubject<string> = new ReplaySubject<string>(5);

  // This is subscribed to from the template using the async pipe
  // Aggregates each message emmited from the ReplaySubject into an array
  messagesArray$: Observable<string[]> = this.messages$.pipe(
    // keep an array of all emitted values in the ReplaySubject
    scan((acc: string[], value: string) => [...acc, value], [])
  );

  clickButton(event: any): void {
    this.buttonClicked$.next(true);
  }

  ngOnInit() {
    // With a subject, our view dosen't know about this value because the subscription
    // happens after the value is emitted. This is why we use a BehaviorSubject instead,
    // which will emit the value to the view when it is subscribed to.
    // this.title$.next('My App');

    // Change the originally false emmission from declaration to true
    this.showSupportButton$.next(true);

    // Add initial messages to the ReplaySubject buffer
    this.messages$.next('Message 1');
    this.messages$.next('Message 2');
    this.messages$.next('Message 3');
    this.messages$.next('Message 4');
    this.messages$.next('Message 5');

    // Add new messages to the ReplaySubject and update the view
    setInterval(() => {
      const newMessage = `Message ${Math.floor(Math.random() * 100)}`;
      this.messages$.next(newMessage);
    }, 1000);
  }
}
