export default class UserAlreadyExistsError extends Error {
    constructor(email: String) {
        super(`An User with the email "${email}" already exist`);
        this.name = 'UserAlreadyExistisError';
    }
}
