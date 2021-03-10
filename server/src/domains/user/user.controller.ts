import { Request, Response } from 'express';
import { Schema } from 'mongoose';
import { validationResult } from 'express-validator';
import UserService from './user.service';
import Logger from '../../utility/logger';

const UserController = () => {
    const NAMESPACE = 'Users';

    const register = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logger.error(NAMESPACE, 'Request validation error', errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, teamId } = req.body;
            const user = await UserService.createNew(name, email, teamId);

            res.json({ user });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
    };

    const findAll = async (req: Request, res: Response) => {
        try {
            const users = await UserService.findAll();
            return users;
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res
                .status(400)
                .json({ errors: [{ msg: 'An error occurred retrieving users.' }] });
        }
    };

    const update = async (req: Request, res: Response) => {
        try {
            const { teamId } = req.body;
            const { id } = req.params;
            const team: Schema.Types.ObjectId = teamId;

            let user = await UserService.updateTeam(id, team);
            res.json({ user });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ errors: [{ msg: 'An error occurred updating user.' }] });
        }
    };

    return {
        register,
        findAll,
        update
    };
};

export default UserController();
