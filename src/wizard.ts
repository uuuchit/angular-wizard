import { Component, ContentChildren, QueryList, AfterContentInit, Output} from '@angular/core';
import { StepComponent } from './step';


@Component({
    selector: 'wizard',
    template: `
        <div class="uk-wizard">
            <div class="uk-wizard-nav">
                <ul>
                  <li *ngFor="let item of items" (click)="navClicked(item.id)" [style.width.%]="navWidth">
                    <span *ngIf="item.step.title">{{item.step.title}}</span>
                    <span *ngIf="!item.step.title">Step {{item.id +1}}</span>
                  </li>
                </ul>
            </div>
            <div class="uk-wizard-steps">
              <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
      .uk-wizard{
        border: 1px solid #ccc;
        border-radius: 2px;
      }
      .uk-wizard-nav{
        width: 100%;

      }
      .uk-wizard-steps{
        width: 100%
      }
      ul{
        padding: 0px;
      }
      li{
        display: inline-block;
        min-width: 100px;
        overflow: hidden;
        text-align: center;
        border-bottom: 5px solid;
        padding: 5px 0px 5px 0px;
      }

    `]
})

export class WizardComponent implements AfterContentInit{
   items: any;
   currentStepIndex: number = 0;
   currentStep: string;
   navWidth: number;
   @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

   navClicked(id: number) {
    this.items[this.currentStepIndex].step.activeStep = false;
    this.currentStepIndex = id;
    this.currentStep = this.items[id];
    this.items[this.currentStepIndex].step.activeStep = true;
    console.log(this.currentStep);
   }
   ngAfterContentInit() {
     let i = 0;
    this.items = this.steps.map((r) => { return {step: r, id: i++}; });
    this.items[this.currentStepIndex].step.activeStep = true; // setting default step as active step.
    this.navWidth = 100/this.items.length;
    this.steps.forEach((r) => {
      r.onBack.subscribe((title: StepComponent) =>{
        if(this.currentStepIndex === 0){
          console.log("you cannot go back from here!!");
        }
        else{
          this.items[this.currentStepIndex].step.activeStep = false;
          this.currentStepIndex -= 1;
          this.currentStep = this.items[this.currentStepIndex];
          this.items[this.currentStepIndex].step.activeStep = true;
          console.log(this.currentStep);
        }
      });
      r.onNext.subscribe((title : StepComponent) =>{
        if(this.currentStepIndex == this.items.length-1){
          //TODO call on finish
          console.log("Finished");
        }
        else{
          this.items[this.currentStepIndex].step.activeStep = false;
          this.currentStepIndex += 1;
          this.currentStep = this.items[this.currentStepIndex];
          this.items[this.currentStepIndex].step.activeStep = true;
          console.log(this.currentStep);
        }
      });
  } );
    console.log(this.steps);
    // setTimeout((r)=>{this.items[0].step.onNext.emit(this.items[0]); console.log("")}, 10000);
   }
}
