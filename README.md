# angular-wizard

Angular wizard is component module which can be used to develop form wizard. 

Installation 

 npm install angularts-wizard


Now import WizardModule in angular module of your application. 

Uses: 
In template. 
```
<wizard [color]="#ccc">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```
[title] is optional. Default value is Step 1  Step 2 and so on. 

You can set color of steps navigation bottom bar . 
Simply pass  [color]="#ccc"  -- color of your choice in wizard tag. see above template for example. default color is blue. 
For button style add global style of button. 

New updates- Now component emit an event on finish. So if its last step then clicking on finish will emit method .. onFinish
Write onFinish on wizard component and event in it -> (onFinish)="someMethod($event)"

```
<wizard [color]="#ccc" #wizu (onFinish)="someMethod($event)">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```
You can call goTo function from your component ... by getting wizard as @viewChild and then writing this.wizard.goto(1) ..
this will take a parameter as number to go to that step .. 

## Upgrading to the latest Angular version

To upgrade to the latest Angular version, follow these steps:

1. Update Angular dependencies in `package.json` to the latest version.
2. Update `rxjs` dependency to the latest version.
3. Update `zone.js` dependency to the latest version.
4. Run `npm install` to install the updated dependencies.
5. Update your Angular application code to be compatible with the latest Angular version. Refer to the Angular update guide for detailed instructions: https://update.angular.io/

## New Features

The following new features have been added to the Angular wizard component:

* Ability to disable steps based on certain conditions.
* Support for custom step validation.
* Ability to dynamically add or remove steps.
* Support for nested wizards.
* Ability to customize the navigation buttons (e.g., change text, add icons).
* Support for different step transition animations.
* Ability to save and restore the wizard state.
* Support for keyboard navigation (e.g., using arrow keys to navigate between steps).
* Ability to display a progress bar indicating the completion status of the wizard.
* Support for internationalization and localization.

### Disabling Steps

You can disable steps based on certain conditions by using the `disabled` input property on the `step` component.

```html
<step [title]="Step one" [disabled]="isStepOneDisabled">
  <h2>Form will be here</h2>
</step>
```

### Custom Step Validation

You can add custom validation for steps by using the `customValidation` input property on the `step` component.

```html
<step [title]="Step one" [customValidation]="validateStepOne">
  <h2>Form will be here</h2>
</step>
```

### Dynamically Adding or Removing Steps

You can dynamically add or remove steps using the `addStep` and `removeStep` methods on the `wizard` component.

```typescript
@ViewChild('wizard') wizard: WizardComponent;

addStep() {
  this.wizard.addStep(newStep);
}

removeStep(stepIndex: number) {
  this.wizard.removeStep(stepIndex);
}
```

### Nested Wizards

You can create nested wizards by including a `wizard` component inside another `wizard` component.

```html
<wizard [color]="#ccc">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <wizard [color]="#ccc">
      <step [title]="Nested Step one">
        <h2>Nested form will be here</h2>
      </step>
      <step [title]="Nested Step Two">
        <h2>Second part of nested form will be here</h2>
      </step>
    </wizard>
  </step>
</wizard>
```

### Customizing Navigation Buttons

You can customize the navigation buttons by using the `nextButtonText` and `backButtonText` input properties on the `wizard` component.

```html
<wizard [color]="#ccc" [nextButtonText]="'Next Step'" [backButtonText]="'Previous Step'">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```

### Step Transition Animations

You can add different step transition animations by using the `transitionAnimation` input property on the `wizard` component.

```html
<wizard [color]="#ccc" [transitionAnimation]="'fade'">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```

### Saving and Restoring Wizard State

You can save and restore the wizard state using the `saveState` and `restoreState` methods on the `wizard` component.

```typescript
@ViewChild('wizard') wizard: WizardComponent;

saveWizardState() {
  const state = this.wizard.saveState();
  localStorage.setItem('wizardState', JSON.stringify(state));
}

restoreWizardState() {
  const state = JSON.parse(localStorage.getItem('wizardState'));
  this.wizard.restoreState(state);
}
```

### Keyboard Navigation

You can navigate between steps using the keyboard (e.g., arrow keys) by enabling keyboard navigation on the `wizard` component.

```html
<wizard [color]="#ccc" [keyboardNavigation]="true">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```

### Progress Bar

You can display a progress bar indicating the completion status of the wizard by enabling the progress bar on the `wizard` component.

```html
<wizard [color]="#ccc" [showProgressBar]="true">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```

### Internationalization and Localization

You can add support for internationalization and localization by providing translations for the wizard component.

```typescript
import { TranslateService } from '@ngx-translate/core';

constructor(private translate: TranslateService) {
  translate.setDefaultLang('en');
  translate.use('en');
}
```
