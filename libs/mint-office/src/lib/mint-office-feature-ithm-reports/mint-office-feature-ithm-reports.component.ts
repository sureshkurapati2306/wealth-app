import { Component } from '@angular/core';
import { IthmReportService } from '../core/services/ithm-report.service';
import { saveAs } from 'file-saver';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';

@Component({
  selector: 'cimb-office-mint-office-feature-ithm-reports',
  templateUrl: './mint-office-feature-ithm-reports.component.html',
  styleUrls: ['./mint-office-feature-ithm-reports.component.scss']
})
export class MintOfficeFeatureIthmReportsComponent {
  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'ITAM REPORTS',
      url: null
    }
  ];

  constructor(
    private ithmReportService: IthmReportService,
  ) { }

  downloadReport(url: string, title: string) {
    this.ithmReportService.getReport(url).subscribe((report: any) => {
      this.downloadFn(report, title);
    })
  }

  downloadFn(csvData: any, title: string) {
    const data: Blob = new Blob([csvData], {
      type: "text/csv;charset=utf-8"
    });

    saveAs(data, title + `.csv`)
  }

}
