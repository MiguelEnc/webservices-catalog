export interface UserTableData {
    id?: string;
    name: string;
    email: string;
    team: UserTeam;
}

interface UserTeam {
    id: string;
    name: string;
}
