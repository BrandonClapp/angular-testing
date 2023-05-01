import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializationComponent } from './initialization.component';
import { InitializationService } from './initialization.service';

describe('InitializationComponent', () => {
  let component: InitializationComponent;
  let fixture: ComponentFixture<InitializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitializationComponent],
      providers: [InitializationService],
    }).compileComponents();

    fixture = TestBed.createComponent(InitializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('all values should be 42', (done) => {
    expect(component.value1).toBe(42);
    expect(component.value2).toBe(42);
    expect(component.value4).toBe(42);
    expect(component.value5).toBe(42);

    expect(TestBed.inject(InitializationService).getValue()).toBe(42);

    // Ensure that the value of value3$ is 42
    component.value3$.subscribe((value) => {
      expect(value).toBe(42);
      done();
    });
  });
});
