import { Component, Input } from '@angular/core';

@Component({
    selector: 'cimb-asnb-card-with-heading',
    templateUrl: './asnb-card-with-heading.component.html',
    styleUrls: ['./asnb-card-with-heading.component.scss'],
})
export class AsnbCardWithHeadingComponent {
    @Input() heading: string;
    @Input() withoutContentContainer: boolean;
}
