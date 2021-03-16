export default class WebServiceAlreadyExistsError extends Error {
    constructor(name: String) {
        super(`A WebService with name ${name} already exists.`);
        this.name = 'WebServiceAlreadyExistsError';
    }
}
