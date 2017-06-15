import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'step',
  template: `
  <div [class.active]="activeStep" [class.inactive]="!activeStep">
    <div class="step-body">
      <ng-content></ng-content>
    </div>
    <div class="step-footer">
      <button *ngIf="!firstStep" id="uk-back" (click)="backClicked()">Back</button>
      <button  *ngIf="!lastStep" id="uk-next" (click)="nextClicked()">Next</button>
      <button  *ngIf="lastStep" id="uk-next" (click)="nextClicked()">Finish</button>
      <div class="clear"></div>
    </div>

  </div>
  `,
  styles: [`
    .active{
      display: block;
    }
    .inactive{
      display: none;
    }
    #uk-back{
      float: left;
      cursor: pointer;
    }
    #uk-next{
      float: right;
      cursor: pointer;
    }
    .step-footer{
      padding: 10px;

    }
    .clear{
      clear: both;
    }

  `]
})

export class StepComponent implements OnInit {
  @Input() title?: string;
  @Input() activeStep?: boolean = false;
  @Input() firstStep?: boolean = false;
  @Input() lastStep?: boolean = false;
  constructor() { }
  @Output() onBack = new EventEmitter<this>();

  @Output() onNext = new EventEmitter<this>();

  backClicked() {
    this.onBack.emit(this);
  }
  nextClicked(){
    this.onNext.emit(this);
  }
  ngOnInit() { }
}
