export default class TeamNotFoundError extends Error {
    constructor(id: String) {
        super(`A Team with id ${id} doesn't exists.`);
        this.name = 'TeamNotFoundError';
    }
}
