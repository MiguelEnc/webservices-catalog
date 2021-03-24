// Squema of the GET / service response
export interface UsersListResponse {
    users: UserTableData[];
}

export interface UserTableData {
    _id: string;
    name: string;
    email: string;
    team: {
        _id: string;
        name: string;
    };
}
