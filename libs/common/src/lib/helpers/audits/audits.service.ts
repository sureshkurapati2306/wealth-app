import { Injectable } from '@angular/core';
import { identity, pickBy } from 'lodash-es';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root',
})
export class AuditsService {
    constructor(private deviceService: DeviceDetectorService) {}

    getAppAuditInfo(
        moduleName: string,
        eventName: string,
        statusRemark?: string,
    ) {
        const { os, browser, deviceType } = this.deviceService.getDeviceInfo();
        const browserType = deviceType === 'desktop' ? 'Web Browser' : 'Mobile Browser';
        const browserName = browser === 'MS-Edge-Chromium' ? 'Edge' : browser;

        const appInfo = {
            moduleName,
            eventName,
            channelName: browserType,
            browserName: browserName,
            osVersion: os,
            statusRemark: statusRemark,
            status: "SUCCESS",
            dateAndTime: new Date().getDate()
        };

        const auditInfo = pickBy(appInfo, identity);

        return {
            ...auditInfo,
        };
    }
}
