import { Request, Response } from 'express';
import WebService from './webservice.service';
import { Webservice, Operation, Endpoint } from './webservice.model';
import Logger from '../../utility/logger';
import { validationResult } from 'express-validator';

const WebServiceController = () => {
    const NAMESPACE = 'WEBSERVICE';

    const findAll = async (req: Request, res: Response) => {
        try {
            const services = WebService.findAll();
            res.json({ services });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ error: true, messages: [{ msg: '' }] });
        }
    };

    const findById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const service = WebService.findById(id);
            res.json({ service });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ error: true, messages: [{ msg: '' }] });
        }
    };

    const create = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logger.error(NAMESPACE, 'Team registration - Request validation error');
            return res.status(400).json({ error: true, messages: errors.array() });
        }

        const {
            name = '',
            version = 0,
            status = '',
            type = '',
            soaType = '',
            cbProject = true,
            configurationPlan = false,
            domain = '',
            teamId = '',
            description = '',
            operations = [],
            endpoints = []
        } = req.body;

        const newEndpoints: Array<Endpoint> = endpoints.map((e: Endpoint) => {
            return { ...e };
        });

        const newOperations: Array<Operation> = operations.map((o: Operation) => {
            return { ...o };
        });

        const service: Webservice = {
            name,
            version,
            status,
            type,
            soaType,
            cbProject,
            configurationPlan,
            domain,
            team: teamId,
            description,
            operations: newOperations,
            endpoints: newEndpoints
        };
        try {
            let newService = await WebService.createNew(service);
            res.json({ service: newService });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ error: true, messages: [{ msg: '' }] });
        }
    };

    const deleteService = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await WebService.delete(id);
            res.json({ msg: 'Service Deleted successfully' });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ error: true, messages: [{ msg: '' }] });
        }
    };

    return {
        findAll,
        findById,
        create,
        deleteService
    };
};

export default WebServiceController();
