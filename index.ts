import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WizardComponent } from './src/wizard';
import { StepComponent } from './src/step';

@NgModule({
    imports: [BrowserModule],
    exports: [WizardComponent, StepComponent ],
    declarations: [WizardComponent, StepComponent]
})

export class WizardModule {

}

export * from './src/wizard';
