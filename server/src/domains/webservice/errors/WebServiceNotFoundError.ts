export default class WebServiceFoundError extends Error {
    constructor(id: String) {
        super(`A WebService with id ${id} doesn't exists.`);
        this.name = 'WebServiceFoundError';
    }
}
