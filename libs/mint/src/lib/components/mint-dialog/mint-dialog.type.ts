export interface MintDialogConfig {
    title?: string;
    message?: string;
    note?: string;
    icon?: {
        show?: boolean;
        name?: string;
        color?: 'primary' | 'accent' | 'warn';
    };
    actions?: {
        confirm?: {
            show?: boolean;
            label?: string;
            color?: 'primary' | 'accent' | 'warn';
            click?: any;
        };
        cancel?: {
            show?: boolean;
            label?: string;
            click?: any;
        };
    };
    dismissible?: boolean;
}
