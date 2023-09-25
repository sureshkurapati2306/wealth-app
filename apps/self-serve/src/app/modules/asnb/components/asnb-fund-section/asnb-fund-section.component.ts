import { Component, Input } from '@angular/core';

@Component({
    selector: 'cimb-asnb-fund-section',
    templateUrl: './asnb-fund-section.component.html',
    styleUrls: ['./asnb-fund-section.component.scss'],
})
export class AsnbFundSectionComponent {
    @Input() title: string | undefined;
    @Input() type: string | undefined;
}
