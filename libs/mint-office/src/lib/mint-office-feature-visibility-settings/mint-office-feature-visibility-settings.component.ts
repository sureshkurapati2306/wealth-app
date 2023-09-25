import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { ListSettings, Setting, SettingGroups } from '../core/models/visibility-settings.models';
import { VisibilitySettingsInit, loadListSettings, loadSaveImage, loadUpdateToggle } from './+state/visibility-settings.actions';
import { getHeaderImgStatus, getListSettings, getSettingGroups } from './+state/visibility-settings.selectors';
import { Environment } from '../core/models/environment.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cimb-office-mint-office-feature-visibility-settings',
  templateUrl: './mint-office-feature-visibility-settings.component.html',
  styleUrls: ['./mint-office-feature-visibility-settings.component.scss']
})
export class MintOfficeFeatureVisibilitySettingsComponent implements OnInit, OnDestroy {

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'SS UT Settings',
      url: null
    }
  ];

  displayedColumns: string[] = ['Function', 'Action'];

  activeFilter: string;

  filters: SettingGroups;

  groups$: Observable<SettingGroups>;

  listSettings$: Observable<ListSettings>;

  setting: Setting;

  readonly environment: Environment;

  imageSrc: string;

  disableSave = true;

  base64WithoutMetadata: string;

  showUploadHeaderError = false;

  _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    @Inject('environment') environment: Environment,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.environment = environment;
    this.imageSrc = this.environment.apiUrl + 'wealth/image/category/1';
  }

  ngOnInit(): void {
    this.store.dispatch(VisibilitySettingsInit({ utSettingGroupId: '01' }));
    this.groups$ = this.store.select(getSettingGroups);
    this.listSettings$ = this.store.select(getListSettings);
  }

  changeFilter(utSettingGroupId: string) {
    this.store.dispatch(loadListSettings({ utSettingGroupId }));
  }

  updateToggle(enabled: MatSlideToggleChange, row: ListSettings) {
    this.setting = {
      enabled: enabled.checked,
      utSettingId: row.utSettingId
    }
    this.store.dispatch(loadUpdateToggle(
      {
        utSettingGroupId: row.utSettingGroupId,
        setting: this.setting
      }
    ));
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.disableSave = false;
      const base64String: string = reader.result as string;
      this.base64WithoutMetadata = this.removeMetadataFromBase64(base64String);
      this.imageSrc = base64String;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  removeMetadataFromBase64(base64String: string): string {
    const [, base64Data] = base64String.split('data:image/png;base64,');
    return base64Data;
  }

  saveImage() {
    const image = {
      id: 0,
      category: 'DASHBOARD_HEADER_IMAGE',
      imageContent: this.base64WithoutMetadata
    }
    this.store.dispatch(loadSaveImage({ image }));
    this.store.select(getHeaderImgStatus).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
      if (res === 'error') {
        this.showUploadHeaderError = true;
        this.cdr.detectChanges();
      } else if (res === 'success') {
        this.showUploadHeaderError = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
