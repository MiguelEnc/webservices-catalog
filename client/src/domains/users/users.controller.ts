import HTTPCaller from '../../utility/HttpCaller';
import { UsersListResponse } from './users.interfaces';
import Logger from '../../utility/Logger';
import User from './user.entity';

const UserController = () => {
    const NAMESPACE = 'Users';
    const BASE_URL = 'http://localhost:5000/api/users/';

    const loadAll = async (): Promise<User[]> => {
        let users: User[] = [];

        try {
            let serviceData: UsersListResponse = await HTTPCaller.get<UsersListResponse>(BASE_URL);
            serviceData.users.map(user => users.push(new User(user)));
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
        }

        return users;
    };

    return {
        loadAll
    };
};

export default UserController();
