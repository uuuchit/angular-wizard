import { Component, ContentChildren, QueryList, AfterContentInit,EventEmitter, Input, Output} from '@angular/core';
import { StepComponent } from './step';


@Component({
    selector: 'wizard',
    template: `
        <div class="uk-wizard">
            <div class="uk-wizard-nav">
                <ul>
                  <li *ngFor="let item of items" (click)="navClicked(item.id)"
                   [style.width.%]="navWidth">
                   <div class="uk-li" [style.border-bottom-color]="color">
                    <span *ngIf="item.step.title">{{item.step.title}}</span>
                    <span *ngIf="!item.step.title">Step {{item.id +1}}</span>
                   </div>
                   <div class="uk-overlay" [class.active]="item.id===currentStepIndex">
                   </div>
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
        margin: 0px;
      }
      li{
        display: inline-block;
        min-width: 100px;
        overflow: hidden;
        position: relative;
      }
      .uk-li{
        width: 100%;
        border-bottom: 5px solid;
        padding: 10px 0px 5px 0px;
        text-align: center;
      }
      li:hover{
        cursor:pointer;
      }
      .uk-overlay{
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 100%;
        height: 5px;
        opacity: .8;
        background-color: #ccc;
      }
      .uk-overlay.active{
        opacity: 0.0;
      }
      :host >>> #uk-back, :host >>> #uk-next{
        min-width: 50px;
        padding: 5px;
      }

    `]
})

export class WizardComponent implements AfterContentInit{
   items: any;
   currentStepIndex: number = 0;
   currentStep: string;
   navWidth: number;
   @Input() color: string = 'blue';
   @ContentChildren(StepComponent) steps: QueryList<StepComponent>;
  @Output() onFinish = new EventEmitter<this>();
   navClicked(id: number) {
    this.items[this.currentStepIndex].step.activeStep = false;
    this.currentStepIndex = id;
    this.currentStep = this.items[id];
    this.items[this.currentStepIndex].step.activeStep = true;
    console.log(this.currentStep);
   }
    goto(id: number) {
      if ( id >= this.items.length){
         this.onFinish.emit(this.items);
      }
      else if(id < 0)
        {
        this.goto(0)
      }
      else{
        this.items[this.currentStepIndex].step.activeStep = false;
        this.currentStepIndex = id;
        this.currentStep = this.items[id];
        this.items[this.currentStepIndex].step.activeStep = true;
        console.log(this.currentStep);
      }

   }
   ngAfterContentInit() {
     let i = 0;
    this.items = this.steps.map((r) => { return {step: r, id: i++}; });
    this.items[this.currentStepIndex].step.activeStep = true; // setting default step as active step.
    this.items[0].step.firstStep = true;
    this.items[this.items.length - 1].step.lastStep = true;
    this.navWidth = 100/ this.items.length;
    this.steps.forEach((r) => {
      r.onBack.subscribe((title: StepComponent) => {
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
      r.onNext.subscribe((title : StepComponent) => {
        if(this.currentStepIndex == this.items.length - 1){
          //TODO call on finish
          this.onFinish.emit(this.items);
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
