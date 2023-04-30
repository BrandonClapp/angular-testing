import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  startWith,
  take,
  tap,
  toArray,
} from 'rxjs';

/**
 * Experimenting with observable types
 */

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
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
  public buttonClicked$: Subject<string> = new Subject<string>();

  // BehaviorSubject is a type of Subject that requires an initial value and emits its current value whenever it is subscribed to.
  public showSupportButton$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // ReplaySubject is a type of Subject that records multiple values from its observable and replays them to new subscribers.
  // For example, if you want to get the last 2 values of an observable, you can use ReplaySubject(2).
  public messages$ = new ReplaySubject<string>(4);

  clickButton(event: any): void {
    this.buttonClicked$.next('Clicked!');
  }

  ngOnInit(): void {
    // With a subject, our view dosen't know about this value because the subscription
    // happens after the value is emitted. This is why we use a BehaviorSubject instead,
    // which will emit the value to the view when it is subscribed to.
    // this.title$.next('My App');

    // Change the originally false emmission from declaration to true
    this.showSupportButton$.next(true);

    // TODO: Figure this out. Still don't understand how ReplaySubects cache individual values
    // and them are able to emit them all at once into an array on the template?...
    this.messages$.next('Message 1');
    this.messages$.next('Message 2');
    this.messages$.next('Message 3');
    this.messages$.next('Message 4');
  }
}
