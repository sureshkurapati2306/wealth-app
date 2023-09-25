import { Component, OnInit } from '@angular/core';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cimb-office-mint-office-feature-asnb-settings',
    templateUrl: './mint-office-feature-asnb-settings.component.html',
    styleUrls: ['./mint-office-feature-asnb-settings.component.scss'],
})
export class MintOfficeFeatureAsnbSettingsComponent implements OnInit {
    initialTabIndex = 0;
    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'ASNB SETTINGS',
            url: null,
        },
    ];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            this.initialTabIndex = +params.get('tab');
        });
    }
}
