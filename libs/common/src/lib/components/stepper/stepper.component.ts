import { Component } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
    selector: 'cimb-stepper',
    templateUrl: './stepper.component.html',
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {
    selectStepByIndex(index: number): void {
        this.selectedIndex = index;
    }
}
