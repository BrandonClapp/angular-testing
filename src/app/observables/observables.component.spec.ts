import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesComponent } from './observables.component';
import { BehaviorSubject, ReplaySubject, Subject, of } from 'rxjs';

describe('ObservablesComponent', () => {
  let component: ObservablesComponent;
  let fixture: ComponentFixture<ObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObservablesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('a ReplaySubject can still be subscribed to after it has been completed', (done) => {
    const replaySubject = new ReplaySubject<string>(1);
    replaySubject.next('Hello');
    replaySubject.complete();

    replaySubject.subscribe((value) => {
      expect(value).toBe('Hello');
      done();
    });
  });

  it('adding new values to a ReplaySubject after it has been completed will not emit the new values', (done) => {
    const replaySubject = new ReplaySubject<string>(1);
    replaySubject.next('Hello');
    replaySubject.complete();
    replaySubject.next('World');

    let count = 0;

    replaySubject.subscribe((value) => {
      count++;
    });

    // Should only have one value
    expect(count).toBe(1);
    done();
  });

  // Question: Does a ReplaySubject emit all stored buffer values to new subscribers if it's already completed?
  // Answer: Yes
  it('a ReplaySubject will replay the entire buffer to new subscribers after completion', (done) => {
    const replaySubject = new ReplaySubject<string>(2);
    replaySubject.next('Hello');
    replaySubject.next('World');

    // Test will pass regardless of whether the ReplaySubject is completed or not
    // since all values are emitted upon subscription both before and after the ReplaySubject is completed
    replaySubject.complete();

    let count = 0;

    replaySubject.subscribe((value) => {
      count++;

      if (count === 2) {
        // In a ReplaySubject, all buffer values are emitted upon subscription even if the ReplaySubject is completed
        // This is different from a BehaviorSubject, which the single value in the buffer is not emitted.
        // Subscribers to a completed BehaviorSubject are not called.

        // Ensure that both values in the buffer have been emitted,
        // eventhough the ReplaySubject is completed
        expect(count).toEqual(2);
        done();
      }
    });
  });

  it('a BehaviorSubject will emit the last value upon subscription', (done) => {
    const behaviorSubject = new BehaviorSubject<string>('Hello');
    behaviorSubject.next('World');

    // The subscriber will receive the last value emitted from the BehaviorSubject
    behaviorSubject.subscribe((value) => {
      expect(value).toEqual('World');
      done();
    });
  });

  it('a BehaviorSubject will not emit any values after it has been completed', (done) => {
    const behaviorSubject = new BehaviorSubject<string>('Hello');
    behaviorSubject.next('World');
    behaviorSubject.complete();

    // This subscriber will not receive any values because the BehaviorSubject is completed
    // If a late subscriber tries to subscribe to a completed BehaviorSubject, it will immediately
    // receive a complete notification without receiving any values.
    behaviorSubject.subscribe((value) => {
      // This callback is not evaluated because the BehaviorSubject is completed
      // If this line was hit, it would cause the test to fail
      // If you subscribe to a completed BehaviorSubject, you won’t receive the last value but for a ReplaySubject(1) you will receive the last value
      // https://stackoverflow.com/questions/43118769/subject-vs-behaviorsubject-vs-replaysubject-in-angular
      expect(false).toBeTruthy();
    });

    done();
  });

  it('Subscribers to a Subject only receives future emissions, as there is no buffer', (done) => {
    const subject = new Subject<string>();
    subject.next('I get dropped because I happen before all subscriptions');

    subject.subscribe((value) => {
      expect(value).toEqual('forty-two');
      done();
    });

    subject.next('forty-two');
  });

  it('A Subject does not emit new values after completion', (done) => {
    const subject = new Subject<string>();
    subject.next('I get dropped because I happen before all subscriptions');

    subject.subscribe((value) => {
      expect(value).toEqual('forty-two');
      expect(value).not.toEqual('forty-three');

      // Hack to ensure that the test waits for all values to be emitted
      setTimeout(() => {
        done();
      }, 1000);
    });

    subject.next('forty-two');
    subject.complete();
    subject.next('forty-three');
  });

  it('A subject does not emit null as first value', (done) => {
    const subject = new Subject<string>();

    subject.subscribe((value) => {
      expect(value).not.toEqual(null);
      done();
    });

    subject.next('forty-two');
  });

  it('An observable should allow a subscription within a test', (done) => {
    const obs = of(42);

    obs.subscribe((value) => {
      expect(value).toEqual(42);
      done();
    });
  });
});
