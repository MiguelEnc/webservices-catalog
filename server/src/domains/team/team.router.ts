import { Router } from 'express';
import { body } from 'express-validator';
import TeamController from './team.controller';

const router = Router();

/**
 * @route       GET api/teams/
 * @description Retrieve full list of teams
 */
router.get('/', TeamController.findAll);

/**
 * @route       GET api/teams/:id
 * @description Retrieve team of the given id param
 */
router.get('/:id', TeamController.findById);

/**
 * @route       POST api/teams/
 * @description Create new team and retrieve stored team
 */
router.post(
    '/',
    [
        body('name', 'Name is required.').not().isEmpty(),
        body('email', 'Email is required').isEmail().normalizeEmail()
    ],
    TeamController.register
);

/**
 * @route       PUT api/teams/:id
 * @description Update team's members and services
 */
router.put('/:id', TeamController.update);

/**
 * @route       DELETE api/teams/:id
 * @description Delete the team with the given id
 */
router.delete('/:id', TeamController.deleteTeam);

export default router;
