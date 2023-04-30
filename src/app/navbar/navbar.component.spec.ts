import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { FeatureService } from '../feature/feature.service';
import { spyOn } from 'jest-mock';
import { CommonModule } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  // The beforeEach function is called before each test in this describe block and also before each test in any nested describe blocks
  beforeEach(async () => {
    /**
     * TestBed is a global test utility provided by Angular that is used to configure and set up the testing environment for Angular tests.
     * For each test that is ran, we configure a clean, isolated, testing module that simulates an Angular module
     */
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [CommonModule],
    }).compileComponents();

    /**
     * Compiling the TestBed allows us to create a fixture for our component, which is a wrapper around our component that gives us access
     * to the component instance and the component's template
     */
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    /*
     * Interact with the fixture to trigger change detection and update the view
     */
    fixture.detectChanges();
  });

  describe('nested describe block', () => {
    /**
     * This beforeEach function will be called before each test in this nested describe block
     */
    beforeEach(() => {
      // Ensure that the outer beforeEach function is called before this one, where the fixture was created
      expect(fixture).toBeTruthy();
    });

    it('should have access to all outer references', () => {
      const isHidden = fixture.componentInstance.isHidden;
      expect(isHidden).toBe(true);

      const isHiddenn = component.isHidden;
      expect(isHiddenn).toBe(true);

      // Retreive the compiled HTML from the fixture

      const compiled = fixture.nativeElement;

      // Assert that the navbar is visible

      expect(compiled.querySelector('.my-app-navbar')).toBeFalsy();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be visible if isHidden is false', () => {
    component.isHidden = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.my-app-navbar')).toBeTruthy();
  });

  it('should be hidden if isHidden is true', () => {
    component.isHidden = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.my-app-navbar')).toBeFalsy();
  });

  it('should be hidden if feature is enabled', () => {
    const featureService = TestBed.inject(FeatureService);

    spyOn(featureService, 'isEnabled').mockReturnValue(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.my-app-navbar')).toBeFalsy();
  });

  it('should be visible if feature is disabled', () => {
    // Retreive a FeatureService instance from our TestBed injector
    const featureService = TestBed.inject(FeatureService);

    // Mock the FeatureService's isEnabled method to return false
    spyOn(featureService, 'isEnabled').mockReturnValue(false);

    // Trigger change detection to update the view because we updated our FeatureService mock
    fixture.detectChanges();

    // Retreive the compiled HTML from the fixture
    const compiled = fixture.nativeElement;

    // Assert that the navbar is visible
    expect(compiled.querySelector('.my-app-navbar')).toBeFalsy();
  });
});

/**
 * An example of overriding providers per unit test.
 * This is useful if you want to provide different mock implementations for different tests,
 * When using the provider provided by the TestBed injector, it's better to override specific methods using
 * spyOn(class, 'method').mockReturnValue(value) as needed.
 * This may, however, be useful if you're testing vastly different implementations of a service.
 */
describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      // Notice that we're not registering FeatureService as a provider here,
      // It's provided by the root injector and we're overriding it in each test
      // a la { providedIn: 'root' }
    }).compileComponents();

    /**
     * This will cause tests that override the FeatureService provider to fail with the following error:
     * Cannot override provider when the test module has already been instantiated. Make sure you are not using `inject` before `overrideProvider`.
     */

    // let fs = TestBed.inject(FeatureService);
  });

  it('should show the component when feature is disabled', () => {
    const mockFeatureService: FeatureService = {
      isEnabled: jest.fn().mockReturnValue(false),
    };

    // Override the provider for this test
    TestBed.overrideProvider(FeatureService, { useValue: mockFeatureService });

    // Fixture is only used local to this test
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.my-app-navbar')).toBeTruthy();
  });

  it('should hide the component when feature is enabled', () => {
    /**
     * Create an object with the same shape as FeatureService that we can use to mock the service
     * specifically for this test.
     */
    const mockFeatureService: FeatureService = {
      // jest.fn() creates a mock function that we can use to spy on calls to the function
      isEnabled: jest.fn().mockReturnValue(true),
    };

    /**
     * We can ovverride the provider for a specific test by using the TestBed.overrideProvider method.
     * Note that this only works if you have not already called TestBed.inject(FeatureService)
     */
    TestBed.overrideProvider(FeatureService, { useValue: mockFeatureService });

    // Fixture is only used local to this test
    const fixture = TestBed.createComponent(NavbarComponent);

    // Trigger change detection to update the view because we updated our FeatureService mock
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.my-app-navbar')).toBeFalsy();
  });
});

/**
 * Testing injection tokens. Not really related to the navbar, but it's a good example of how to test injection tokens.
 */
describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [CommonModule],
      providers: [],
    }).compileComponents();
  });

  it('should inject a default value for injection token', () => {
    // We createComponent here and store a local reference so that we don't compile the component at the scope
    // that gets reused on _every_ test.

    const fixture: ComponentFixture<NavbarComponent> =
      TestBed.createComponent(NavbarComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.injected-token').textContent).toContain(
      'Hello Token'
    );

    // We can also access the component instance and assert that the injected token is what we expect
    const component = fixture.componentInstance;
    expect(component.tokenValue).toBe('Hello Token');
  });

  it('allows for a custom value to be injected for injection token', () => {
    // Override the value of the injection token
    // We cannot do this after invoking TestBed.createComponent(NavbarComponent);
    // That is why we don't compile it in the beforeEach.
    TestBed.overrideProvider('MY_INJECTION_TOKEN', {
      useValue: 'Goodbye Token',
    });

    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.injected-token').textContent).toContain(
      'Goodbye Token'
    );

    // We can also access the component instance and assert that the injected token is what we expect
    const component = fixture.componentInstance;
    expect(component.tokenValue).toBe('Goodbye Token');
  });
});
