import { Router } from 'express';
import { body } from 'express-validator';
import WebServiceController from './webservice.controller';

const router = Router();

/**
 * @route       GET api/services/
 * @description Retrieve full list of services
 */
router.get('/', WebServiceController.findAll);

/**
 * @route       GET api/services/:id
 * @description Retrieve service of the given id param
 */
router.get('/:id', WebServiceController.findById);

/**
 * @route       POST api/services/
 * @description Create new service and retrieve stored service
 */
router.post(
    '/',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('version', 'Version is required').not().isEmpty(),
        body('status', 'Status is required').not().isEmpty(),
        body('type', 'Type is required').not().isEmpty(),
        body('soaType', 'SoaType is required').not().isEmpty(),
        body('cbProject', 'CB Project flag is required').not().isEmpty(),
        body('configuration', 'Configuration flag is required').not().isEmpty(),
        body('domain', 'Domain is required').not().isEmpty(),
        body('team', 'Team is required').not().isEmpty(),
        body('description', 'Description is required').not().isEmpty(),
        body('operations', 'Operations is required').not().isEmpty(),
        body('endpoints', 'Endpoints is required').not().isEmpty()
    ],
    WebServiceController.create
);

/**
 * @route       DELETE api/services/:id
 * @description Delete the service with the given id
 */
router.delete('/:id', WebServiceController.deleteService);

export default router;
