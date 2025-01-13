import { Component, ContentChildren, QueryList, AfterContentInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { StepComponent } from './step';

@Component({
  selector: 'wizard',
  template: `
    <div class="uk-wizard">
      <div class="uk-wizard-nav">
        <ul>
          <li *ngFor="let item of items" (click)="navClicked(item.id)" [style.width.%]="navWidth">
            <div class="uk-li" [style.border-bottom-color]="color">
              <span *ngIf="item.step.title">{{item.step.title}}</span>
              <span *ngIf="!item.step.title">Step {{item.id + 1}}</span>
            </div>
            <div class="uk-overlay" [class.active]="item.id === currentStepIndex"></div>
          </li>
        </ul>
      </div>
      <div class="uk-wizard-steps">
        <ng-content></ng-content>
      </div>
      <div *ngIf="showProgressBar" class="progress-bar">
        <div class="progress" [style.width.%]="progress"></div>
      </div>
    </div>
  `,
  styles: [`
    .uk-wizard {
      border: 1px solid #ccc;
      border-radius: 2px;
    }
    .uk-wizard-nav {
      width: 100%;
    }
    .uk-wizard-steps {
      width: 100%;
    }
    ul {
      padding: 0px;
      margin: 0px;
    }
    li {
      display: inline-block;
      min-width: 100px;
      overflow: hidden;
      position: relative;
    }
    .uk-li {
      width: 100%;
      border-bottom: 5px solid;
      padding: 10px 0px 5px 0px;
      text-align: center;
    }
    li:hover {
      cursor: pointer;
    }
    .uk-overlay {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 5px;
      opacity: .8;
      background-color: #ccc;
    }
    .uk-overlay.active {
      opacity: 0.0;
    }
    :host >>> #uk-back, :host >>> #uk-next {
      min-width: 50px;
      padding: 5px;
    }
    .progress-bar {
      width: 100%;
      height: 10px;
      background-color: #f3f3f3;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 10px;
    }
    .progress {
      height: 100%;
      background-color: #4caf50;
      transition: width 0.3s;
    }
  `]
})
export class WizardComponent implements AfterContentInit {
  items: any;
  currentStepIndex: number = 0;
  currentStep: string;
  navWidth: number;
  @Input() color: string = 'blue';
  @Input() nextButtonText?: string;
  @Input() backButtonText?: string;
  @Input() transitionAnimation?: string;
  @Input() showProgressBar: boolean = false;
  @Input() keyboardNavigation: boolean = false;
  @Input() translations: any;
  @ContentChildren(StepComponent) steps: QueryList<StepComponent>;
  @Output() onFinish = new EventEmitter<this>();
  progress: number = 0;

  navClicked(id: number) {
    if (this.items[id].step.disabled) {
      return;
    }
    this.items[this.currentStepIndex].step.activeStep = false;
    this.currentStepIndex = id;
    this.currentStep = this.items[id];
    this.items[this.currentStepIndex].step.activeStep = true;
    this.updateProgress();
  }

  goto(id: number) {
    if (id >= this.items.length) {
      this.onFinish.emit(this.items);
    } else if (id < 0) {
      this.goto(0);
    } else {
      if (this.items[id].step.disabled) {
        return;
      }
      this.items[this.currentStepIndex].step.activeStep = false;
      this.currentStepIndex = id;
      this.currentStep = this.items[id];
      this.items[this.currentStepIndex].step.activeStep = true;
      this.updateProgress();
    }
  }

  addStep(step: StepComponent) {
    this.items.push({ step: step, id: this.items.length });
    this.navWidth = 100 / this.items.length;
  }

  removeStep(stepIndex: number) {
    this.items.splice(stepIndex, 1);
    this.navWidth = 100 / this.items.length;
  }

  saveState() {
    return {
      currentStepIndex: this.currentStepIndex,
      steps: this.items.map((item: any) => ({
        title: item.step.title,
        activeStep: item.step.activeStep,
        firstStep: item.step.firstStep,
        lastStep: item.step.lastStep,
        shouldEnter: item.step.shouldEnter,
        disabled: item.step.disabled
      }))
    };
  }

  restoreState(state: any) {
    this.currentStepIndex = state.currentStepIndex;
    this.items = state.steps.map((step: any, index: number) => ({
      step: { ...step, id: index },
      id: index
    }));
    this.navWidth = 100 / this.items.length;
    this.items[this.currentStepIndex].step.activeStep = true;
    this.updateProgress();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.keyboardNavigation) {
      return;
    }
    if (event.key === 'ArrowRight') {
      this.goto(this.currentStepIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      this.goto(this.currentStepIndex - 1);
    }
  }

  updateProgress() {
    this.progress = ((this.currentStepIndex + 1) / this.items.length) * 100;
  }

  ngAfterContentInit() {
    let i = 0;
    this.items = this.steps.map((r) => ({ step: r, id: i++ }));
    this.items[this.currentStepIndex].step.activeStep = true; // setting default step as active step.
    this.items[0].step.firstStep = true;
    this.items[this.items.length - 1].step.lastStep = true;
    this.navWidth = 100 / this.items.length;
    this.updateProgress();
    this.steps.forEach((r) => {
      r.onBack.subscribe((title: StepComponent) => {
        if (this.currentStepIndex === 0) {
          console.log("you cannot go back from here!!");
        } else {
          this.items[this.currentStepIndex].step.activeStep = false;
          this.currentStepIndex -= 1;
          this.currentStep = this.items[this.currentStepIndex];
          this.items[this.currentStepIndex].step.activeStep = true;
          this.updateProgress();
        }
      });
      r.onNext.subscribe((title: StepComponent) => {
        if (this.currentStepIndex == this.items.length - 1) {
          this.onFinish.emit(this.items);
          console.log("Finished");
        } else {
          this.items[this.currentStepIndex].step.activeStep = false;
          this.currentStepIndex += 1;
          this.currentStep = this.items[this.currentStepIndex];
          this.items[this.currentStepIndex].step.activeStep = true;
          this.updateProgress();
        }
      });
    });
  }
}
