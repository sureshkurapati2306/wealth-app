import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import * as DashboardPopupActions from './+state/dashboard-popup.actions'
import { Observable, Subscription, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardPopupUpload } from '../../core/models/dashboard-popup.model';
import { NgForm } from '@angular/forms';
import { DashboardPopupService } from '../../core/services/dashboard-popup.service';
import { catchError } from 'rxjs/operators';
import { Environment } from '../../core/models/environment.model';
import { HttpClient } from '@angular/common/http';


let globalImageUploadString: any;

@Component({
  selector: 'cimb-office-dashboard-popup',
  templateUrl: './dashboard-popup.component.html',
  styleUrls: ['./dashboard-popup.component.scss']
})

export class DashboardPopupComponent implements OnInit {
  @ViewChild('myForm', { static: true }) myForm: NgForm;

  status = false;
  maxCharacterLengthTitle = 50;
  maxCharacterLengthSubTitle = 100;
  maxCharacterLengthContent = 200;

  titleCount = [];
  subTitleCount = [];
  contentCount = [];

  textPlaceholder = "Type here";

  titleComments = '';
  subtitleComments = '';
  contentComments = '';

  imageUploadError = false;
  imageSrc = '';
  imageSrcfile = '';
  closePreview: boolean;

  disableSave = true;
  dialogPopup: any;
  dialogPopupObservable$: Observable<any[]>;
  dialogPopupSubscription: Subscription;
  readonly environment: Environment;
  elementHeight: string;
  imageUploadErrorMsg = '';


  constructor(private store: Store,
    private dashboardPopupService: DashboardPopupService,
    @Inject('environment') environment: Environment,
    private http: HttpClient) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.closePreview = false;
    this.callPopUpAPI()
  }

  handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'image/png' && file.size <= 500 * 1024) {
      const reader = new FileReader();
      reader.onload = (data) => {
        const base64String = data?.target?.result as string;
        if (base64String) {
          this.imageSrc = base64String;
        } else {
          this.imageSrc = '';
        }

        const prefixRemoved = base64String?.split(',')[1];
        globalImageUploadString = prefixRemoved;
        this.updatePreview();
      };
      reader.readAsDataURL(file);
      this.imageUploadError = false;
      this.imageUploadErrorMsg = ''
    } else {
      this.imageUploadError = true;
      this.imageUploadErrorMsg = 'Please Check image format and size(max 500kb is allowed)'
      this.imageSrc = '';
      globalImageUploadString = '';
      this.updatePreview();
    }

  }

  updatePreview(): void {
    this.closePreview = true;
    this.titleComments = this.titleComments?.slice(0, this.maxCharacterLengthTitle);
    this.subtitleComments = this.subtitleComments?.slice(0, this.maxCharacterLengthSubTitle);
    this.contentComments = this.contentComments?.slice(0, this.maxCharacterLengthContent);
    if (!this.myForm.invalid && (this.imageSrc || globalImageUploadString) && this.status) {
      this.disableSave = false;
    } else if (!this.myForm.invalid && (this.imageSrc || globalImageUploadString) && !this.status) {
      this.disableSave = false;
    } else {
      this.disableSave = true;
    }
  }

  submitForm(form: NgForm) {
    if ((globalImageUploadString && globalImageUploadString === '') || ( this.imageSrcfile && this.imageSrcfile === '')) {
      this.imageUploadError = true;
      this.imageUploadErrorMsg = 'Please Upload an image';
    } else {
      this.imageUploadError = false;
      this.imageUploadErrorMsg = '';
    }
    let imageContent: string;
    if (globalImageUploadString) {
      imageContent = globalImageUploadString?.toString();
    } else if (this.imageSrcfile) {
      imageContent = this.imageSrcfile;
    } else {
      imageContent = '';
    }

    if (!form.invalid && !this.imageUploadError) {
      this.disableSave = false;
      const payload: DashboardPopupUpload = {
        title: this.titleComments,
        subtitle: this.subtitleComments,
        content: this.contentComments,
        status: this.status,
        imageContent: imageContent
      };
      this.store.dispatch(DashboardPopupActions.loadDashboardPopup({ loadDashboardPopupdata: payload }));
    }
    this.disableSave = true;
  }

  callPopUpAPI(): boolean {
    this.dashboardPopupService.getPopUpDetails('1')
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.dialogPopup = response;
          this.closePreview = true;
          this.titleComments = this.dialogPopup ? this.dialogPopup?.title : '';
          this.subtitleComments = this.dialogPopup ? this.dialogPopup?.subtitle : '';
          this.contentComments = this.dialogPopup ? this.dialogPopup?.content : '';
          this.status = this.dialogPopup?.status;
          this.imageSrc = this.environment?.apiUrl ? this.environment.apiUrl + 'wealth/image/category/2' : '';
          this.convertToBase64(this.environment.apiUrl + 'wealth/image/category/2');
          if (this.titleComments?.length && this.subtitleComments?.length && this.contentComments?.length && this.imageSrc?.length) {
            this.disableSave = false;
          } else {
            this.disableSave = true;
          }
          if (this.imageSrc && this.imageSrc == '') {
            this.imageUploadError = true;
            this.imageUploadErrorMsg = 'Please Upload an image';
          } else {
            this.imageUploadError = false;
            this.imageUploadErrorMsg = '';
          }
        }
      });
    return true;
  }

  convertToBase64(imageUrl: string): any {
    this.http.get(imageUrl, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const img = new Image();
        img.src = URL.createObjectURL(response);

        img.onload = () => {
          URL.revokeObjectURL(img.src);

          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);

          const base64Image = canvas.toDataURL('image/png').split(',')[1];
          if (base64Image) {
            this.imageSrcfile = base64Image;
          } else {
            this.imageSrcfile = '';
          }
          return base64Image.toString();
        };

        img.onerror = () => {
          console.error('Failed to load the image.');
        };
      },
      (error) => {
        console.error('Error fetching the image:', error);
      }
    );
  }
}
