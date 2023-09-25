import { Component, Input } from '@angular/core';
import { AsnbCardDetail } from '../../models';

@Component({
    selector: 'cimb-asnb-card-details-template',
    templateUrl: './asnb-card-details-template.component.html',
    styleUrls: ['./asnb-card-details-template.component.scss'],
})
export class AsnbCardDetailsTemplateComponent {
    @Input() heading: string;
    @Input() items: AsnbCardDetail[] = [];
}
