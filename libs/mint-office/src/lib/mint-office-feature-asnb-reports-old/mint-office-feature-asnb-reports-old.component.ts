import { Component } from '@angular/core';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { AsnbReportsService } from '../core/services/asnb-reports.service';

import { saveAs } from 'file-saver';

@Component({
    selector: 'cimb-office-mint-office-feature-asnb-reports-old',
    templateUrl: './mint-office-feature-asnb-reports-old.component.html',
    styleUrls: ['./mint-office-feature-asnb-reports-old.component.scss'],
})
export class MintOfficeFeatureAsnbReportsOldComponent {
    constructor(private asnbReports: AsnbReportsService) {}
    breadcrumbsPaths: BreadcrumbsPath[] = [
        {
            label: 'ASNB Reports',
            url: null,
        },
    ];

    downloadReport(url: string, title: string) {
        this.asnbReports.getReport(url).subscribe((report: any) => {
            this.handleDownload(report, title);
        });
    }

    handleDownload(csvData: any, title: string) {
        const data: Blob = new Blob([csvData], {
            type: 'text/csv;charset=utf-8',
        });

        saveAs(data, title + `.csv`);
    }
}
