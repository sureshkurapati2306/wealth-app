import {
    AfterViewChecked,
    Component,
    ElementRef,
    Inject,
    OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../../../../../../apps/self-serve/src/app/core/services/app.service';

@Component({
    selector: 'cimb-dialog-alert',
    templateUrl: './dialog-alert.component.html',
    styleUrls: ['./dialog-alert.component.scss'],
})
export class DialogAlertComponent implements OnInit, AfterViewChecked {
    public timer: number;
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialogRef: MatDialogRef<DialogAlertComponent>,
        private elementRef: ElementRef,
        private appService: AppService,
    ) {
        this.appService.getObservable().subscribe(val => this.timer = val);
    }

    dialogImage = '';
    dialogHeading = '';
    dialogHeadingSubText = '';
    hasTimeout = false;
    dialogContent = '';
    dialogButtonCancel = false;
    dialogButtonProceed = false;
    dialogButtonCancelText = '';
    dialogButtonProceedText = '';
    dialogClickAction = '';
    dialogFooter = null;
    dialogFooterSubText = null;
    dialogFooterContent = null;
    uiLoaded = false;
    dialogShowCloseButtonCancel = false;

    ngOnInit(): void {
        this.dialogImage = this.data?.dialogImage;
        this.dialogHeading = this.data?.dialogHeading;
        this.dialogHeadingSubText = this.data?.dialogHeadingSubText;
        this.hasTimeout = this.data?.hasTimeout;
        this.dialogContent = this.data?.dialogContent;
        this.dialogButtonCancel = this.data?.dialogButtonCancel;
        this.dialogButtonProceed = this.data?.dialogButtonProceed;
        this.dialogButtonCancelText = this.data?.dialogButtonCancelText;
        this.dialogButtonProceedText = this.data?.dialogButtonProceedText;
        this.dialogClickAction = this.data?.dialogClickAction;
        this.dialogFooter = this.data?.dialogFooter;
        this.dialogFooterSubText = this.data?.dialogFooterSubText;
        this.dialogFooterContent = this.data?.dialogFooterContent;
        this.dialogShowCloseButtonCancel = this.data?.dialogShowCloseButtonCancel;
    }

    proceed() {
        this.dialogRef.close(this.dialogButtonProceedText);
    }

    cancel() {
        this.dialogRef.close(this.dialogButtonCancelText);
    }

    ngAfterViewChecked() {
        if (
            this.elementRef.nativeElement.querySelector(
                '.go_to_consumer_contact_centre_link',
            ) && !this.uiLoaded
        ) {
            this.uiLoaded = true;
            this.elementRef.nativeElement
                .querySelector('.go_to_consumer_contact_centre_link')
                .addEventListener(
                    'click',
                    this.goToConsumerContactCentreLink.bind(this),
                );
        }
    }

    goToConsumerContactCentreLink() {
        window.open(
            'https://www.cimb.com.my/en/personal/help-support/contact-us.html',
            '_blank',
        );
    }
}
