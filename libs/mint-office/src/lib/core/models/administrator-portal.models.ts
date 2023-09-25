export interface AdministratorTable {
    isLastPage: boolean;
    pageIndex: number;
    pageSize: number;
    users: ListUser[];
}

export interface ListUser {
    username: string; // Lan ID
    name: string;
    staff_id: string; // Employee ID
    groups: string[];
    created_date: string;
    enabled: boolean;
}

export interface UserRole {
    name: string;
    value: string;
}
