import { Router } from 'express';
import { body } from 'express-validator';
import UserController from './user.controller';

const router = Router();

/**
 * @route       GET api/users/
 * @description Retrieve full list of users
 */
router.get('/', UserController.findAll);

/**
 * @route       POST api/users/
 * @description Create new user and retrieve stored user
 */
router.post(
    '/',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Email is required').isEmail().normalizeEmail()
    ],
    UserController.register
);

/**
 * @route       PUT api/users/:id
 * @description Update user team by user id
 */
router.put('/:id', [body('teamId')], UserController.update); // TODO: probar

/**
 * @route       DELETE api/users/:id
 * @description Deletes the user with the given id
 */
router.delete('/:id', UserController.deleteUser);

export default router;
