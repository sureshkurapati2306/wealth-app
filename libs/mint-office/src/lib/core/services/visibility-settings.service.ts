import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../models/environment.model';
import { ListSettings, SettingGroups, Setting, Image } from '../models/visibility-settings.models';

@Injectable({
  providedIn: 'root'
})
export class VisibilitySettingsService {
  readonly environment: Environment;
  private settingGroupsUrl: string;

  constructor(
    @Inject('environment') environment: Environment,
    private http: HttpClient
  ) { 
    this.environment = environment;
    this.settingGroupsUrl = this.environment.apiUrl + 'validate/ss-ut-settings/groups'; 
  }

  getAllSettingGroups(): Observable<SettingGroups> {
    return this.http
      .get<SettingGroups>(this.settingGroupsUrl)
  }

  getListSettingsByGroup(utSettingGroupId: string): Observable<ListSettings> {
    return this.http
      .get<ListSettings>(this.settingGroupsUrl + '/' + utSettingGroupId + '/settings')
  }

  updateToggleAction(utSettingGroupId: string, setting: Setting): Observable<ListSettings> {
    return this.http
      .patch<ListSettings>(this.settingGroupsUrl + '/' + utSettingGroupId + '/settings', setting)
  }

  updateImage(imageData: Image): Observable<Image> {
    return this.http
      .put<Image>(this.environment.apiUrl + 'wealth/image', imageData)
  }
}
