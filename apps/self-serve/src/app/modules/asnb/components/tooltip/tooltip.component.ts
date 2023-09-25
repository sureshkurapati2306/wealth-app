import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from '@cimb/mint';

@Component({
    selector: 'cimb-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent {
    @Input() tooltipText: string;
    @Input() tooltipHeading: string;
    @Input() tooltipPosition = 'right';

    constructor(private bottomSheet: MatBottomSheet) {}

    openBottomSheet(): void {
        this.bottomSheet.open(MobileTooltipComponent, {
            panelClass: 'tooltip-action-sheet',
            data: {
                actionHeading: this.tooltipHeading,
                actionContent: `<p class="tooltip-bottom-sheet">${this.tooltipText}</p>`,
            },
        });
    }
}
