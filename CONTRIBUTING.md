# Contributing to Angular Wizard

Thank you for considering contributing to Angular Wizard! We welcome contributions to make this project even better. Please follow the guidelines below to ensure a smooth contribution process.

## Reporting Bugs

If you find a bug, please report it by opening an issue on the [GitHub repository](https://github.com/uuuchit/angular-wizard/issues). Provide as much detail as possible, including steps to reproduce the issue and any relevant code snippets.

## Feature Requests

If you have an idea for a new feature, please open an issue on the [GitHub repository](https://github.com/uuuchit/angular-wizard/issues) and describe the feature in detail. We welcome suggestions and feedback from the community.

## Contributing Code

To contribute code, follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes in the new branch.
5. Write tests to cover your changes.
6. Ensure all tests pass.
7. Commit your changes and push the branch to your forked repository.
8. Open a pull request on the main repository.

## Coding Guidelines

- Follow the existing code style and conventions.
- Write clear and concise commit messages.
- Include comments in your code where necessary to explain complex logic.
- Write tests to cover your changes and ensure existing tests pass.

## New Features

When contributing new features, please ensure they align with the project's goals and follow the guidelines below:

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

## Thank You

Thank you for your contributions! Together, we can make Angular Wizard even better.
