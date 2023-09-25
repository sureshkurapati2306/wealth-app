import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';

export interface Documents {
  name: string;
}

@Component({
  selector: 'cimb-card-fund-document',
  templateUrl: './card-fund-document.component.html',
  styleUrls: ['./card-fund-document.component.scss'],
})
export class CardFundDocumentComponent implements OnInit {
  @Input() disclaimer: string;
  @Input() addClass: string;
  @Input() documentNames;
  @Output() documentDownloadEmitter: EventEmitter<any> = new EventEmitter();
  @Input() switchFundPopup:any;

  documents: Documents[];

  showText = 'Read More';

  firstCount = 100;

  last_index = 100;

  counter = 100;

  disclaimerText =
    '<p>© 2020 Morningstar. All Rights Reserved. The information, data, analyses and opinions (“Information”) contained herein: (1) include the proprietary information of Morningstar and its content providers; (2) may not be copied or redistributed except as specifically authorised; (3) do not constitute investment advice; (4) are provided solely for informational purposes; (5) are not warranted to be complete, accurate or timely; and (6) may be drawn from fund data published on various dates. Morningstar is not responsible for any trading decisions, damages or other losses related to the Information or its use. Please verify all of the Information before using it and don’t make any investment decision except upon the advice of a professional financial adviser. Past performance is no guarantee of future results. The value and income derived from investments may go down as well as up.</p>';
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.documents = this.documentNames

    this.last_index = this.disclaimer?.substring(0, 99).lastIndexOf(' ');

    if (this.last_index > 100) this.last_index = 100;
    this.counter = this.last_index;
  }

  disclaimerModal() {
    this.dialog.open(DialogAlertComponent, {
      backdropClass: 'no-backdrop',
      panelClass: 'terms-modal',
      maxWidth: '800px',
      autoFocus: false,
      data: {
        dialogHeading: 'Morningstar Disclaimer',
        dialogContent: '<div class="content">' + this.disclaimerText + '</div>',
      },
    });
  }

  checkDocAvailability(docUrl: string) {
    if (docUrl) {
      window.open(docUrl, "_blank", "noopener,noreferrer");
    } else {
      this.dialog.open(DialogAlertComponent, {
        panelClass: ['custom-dialog', 'dialog-inverse-button'],
        maxWidth: '600px',
        autoFocus: false,
        backdropClass: 'backdrop-modal',
        data: {
          dialogImage: '<em class="icon-warning">',
          dialogHeading: 'Download Failed',
          dialogContent:
            '<p>Sorry this file appears to be missing. Please try again later or reach out <br/> to our customer support.</p>',
          dialogButtonProceed: true,
          dialogButtonProceedText: 'Okay',
        },
      });
    }
  }

  onDownload(documentName) {
    this.documentDownloadEmitter.emit(documentName)
  }
}
