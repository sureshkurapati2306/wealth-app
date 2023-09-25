import { createAction, props } from '@ngrx/store';
import { ListSettings, Setting, SettingGroups, Image } from '../../core/models/visibility-settings.models';

export const VisibilitySettingsInit = createAction(
    '[VisibilitySettings/API Call] VisibilitySettings Init',
    props<{ utSettingGroupId: string }>(),
);

export const loadVisibilitySettingsSuccess = createAction(
    '[VisibilitySettings/API RETURN] Load VisibilitySettings Success',
    props<{ settingGroups: SettingGroups, listSettings: ListSettings }>(),
);

export const loadListSettings = createAction(
    '[VisibilitySettings/API CALL] load List Settings',
    props<{ utSettingGroupId: string }>(),
);

export const loadUpdateToggle = createAction(
    '[VisibilitySettings/API CALL] load Update Toggle',
    props<{ utSettingGroupId: string, setting: Setting }>(),
);

export const loadListSettingsSuccess = createAction(
    '[VisibilitySettings/API RETURN] Load listSettings Success',
    props<{ listSettings: ListSettings }>(),
);

export const loadSaveImage = createAction(
    '[HeaderLogo/API CALL] Load Save Image',
    props<{ image: Image }>(),
);

export const loadSaveImageSuccess = createAction(
    '[HeaderLogo/API RETURN] Load Save Image Success',
    props<{ image: Image }>(),
);

export const loadVisibilitySettingsFailure = createAction(
    '[VisibilitySettings/API RETURN] Load VisibilitySettings Failure',
    props<{ error: any }>(),
);
