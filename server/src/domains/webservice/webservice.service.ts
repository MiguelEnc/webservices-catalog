import WebserviceModel, { Webservice } from './webservice.model';
import WebServiceAlreadyExistsError from './errors/WebServiceAlreadyExistsError';

const Service = {
    findAll: async () => {
        const services = await WebserviceModel.find({});
        return services;
    },

    findById: async (id: String) => {
        const service = await WebserviceModel.findById(id);
        return service;
    },

    createNew: async (webservice: Webservice) => {
        let { name } = webservice;
        let service = await WebserviceModel.findOne({ name });
        if (service) {
            throw new WebServiceAlreadyExistsError(name);
        }

        service = new WebserviceModel(webservice);

        await service.save();

        return service;
    },

    delete: async (id: String) => {
        await WebserviceModel.findByIdAndDelete(id);
    }
};

export default Service;
