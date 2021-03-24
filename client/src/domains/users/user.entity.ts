import { UserTableData } from './users.interfaces';

export default class User {
    id: string = '';
    name: string = '';
    email: string = '';
    team: string = '';

    constructor(apiUser: UserTableData) {
        this.id = apiUser._id;
        this.name = apiUser.name;
        this.email = apiUser.email;
        this.team = apiUser.team.name;
    }
}
