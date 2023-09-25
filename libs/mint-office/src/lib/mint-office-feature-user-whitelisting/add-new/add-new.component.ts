import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreadcrumbsPath } from '../../core/models/breadcrumbs-path.model';
import { FormBuilder, FormGroup, FormGroupDirective, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { WhitelistingUserService } from '../../core/services/whitelisting-user.service'
import { SnackBarService } from '../../core/services/snack-bar.service'

@Component({
  selector: 'cimb-office-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'USER WHITELISTING',
      url: '/user-whitelisting'
    },
    {
      label: 'ADD NEW',
      url: null
    }
  ];

  @ViewChild('addNewForm', { static: true }) addNewForm: FormGroupDirective;
  @ViewChild('fileInput') fileInput: ElementRef;

  addNewFb: FormGroup;

  constructor(private fb: FormBuilder, 
              private whitelistingUserService: WhitelistingUserService,
              private snackBarService:SnackBarService) { 
              }

  ngOnInit(): void {
    this.addNewFb = this.fb.group({
      uploadfile: ['', [Validators.required, this.validateCsvFileType]]
    });
  }

  submit() {
    const filename = this.addNewFb.get('uploadfile').value;
    if (this.isValidCsv(filename)) {
      const file = this.fileInput.nativeElement.files[0];
      this.uploadCsv(file);
    }
  }

  clear() {
    this.addNewForm.resetForm();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (this.isValidCsv(file.name)) {
        this.addNewFb.patchValue({
          uploadfile: file.name,
        });
        this.addNewFb.get('uploadfile').updateValueAndValidity();
      } else {
        input.value = '';
      }
    }
  }

  isValidCsv(filePath: string): boolean {
    return filePath.endsWith('.csv');
  }

  validateCsvFileType(control: AbstractControl): ValidationErrors | null {
    if (control.value && !control.value.endsWith('.csv')) {
      return { invalidCsv: true };
    }
    return null;
  }

  uploadCsv(file: File) {
    this.whitelistingUserService.uploadWhiteListingCsvFile(file).subscribe(
      response => {
        if (response) {
          if (response.error) {
            this.snackBarService.openSnackbar('File upload has failed', 5000, 'danger');
          } else if (response === '' || response === null) {
            this.snackBarService.openSnackbar('Server returned an empty response', 5000, 'warning');
          } else {
            this.snackBarService.openSnackbar('File has been uploaded successfully', 5000, 'success');
          }
        }
      },
      error => {
        console.error('Upload error:', error);
        this.snackBarService.openSnackbar('An error occurred during file upload', 5000, 'danger');
      }
    );    
  }
}
