import { Component, Input } from '@angular/core';
import {
    AsnbAddFavourite,
    AsnbIdType,
    AsnbRelationship,
    AsnbFundTypeMaps,
    AsnbPurchaseFavouriteSummary,
} from '../../models';
@Component({
    selector: 'cimb-asnb-card-account-details',
    templateUrl: './asnb-card-account-details.component.html',
    styleUrls: ['./asnb-card-account-details.component.scss'],
})
export class AsnbCardAccountDetailsComponent {
    @Input() accountDetails: AsnbAddFavourite;
    @Input() idTypes: AsnbIdType[];
    @Input() relationships: AsnbRelationship[];
    @Input() fundTypes: AsnbFundTypeMaps;
    @Input() purchaseFavouriteDetails: AsnbPurchaseFavouriteSummary;
    @Input() purchaseReason: string;

    getIdTypeName(id) {
        const idTypeObj = this.idTypes.find((item) => item.id === id);
        return idTypeObj ? idTypeObj.value : '-';
    }

    getRelationshipName(id) {
        const relationshipTypeObj = this.relationships.find((item) => item.id === id);
        return relationshipTypeObj ? relationshipTypeObj.value : '-';
    }

    getFundName(id) {
        return this.fundTypes[id] ? this.fundTypes[id].fundLongName : '-';
    }
}
