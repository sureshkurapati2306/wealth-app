export interface SettingGroups {
    description: string;
    utSettingGroupId: string;
}

export interface ListSettings {
    description: string;
    enabled: boolean;
    utSettingId: string;
    utSettingGroupId: string;
}

export interface Setting {
    enabled: boolean;
    utSettingId: string;
}

export interface Image {
    id: number;
    category: string;
    imageContent: string;
}
