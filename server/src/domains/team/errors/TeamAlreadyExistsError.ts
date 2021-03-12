export default class TeamAlreadyExistsError extends Error {
    constructor(name: String, email: String) {
        super(`A Team with name ${name} or email ${email} already exists.`);
        this.name = 'TeamAlreadyExistsError';
    }
}
