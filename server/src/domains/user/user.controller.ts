import { Request, Response } from 'express';
import { Schema } from 'mongoose';
import { validationResult } from 'express-validator';
import UserService from './user.service';
import Logger from '../../utility/logger';
import { User } from './user.model';

const UserController = () => {
    const NAMESPACE = 'Users';

    const register = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logger.error(NAMESPACE, 'User registration - Request validation error');
            return res.status(400).json({ error: true, messages: errors.array() });
        }

        try {
            const { name, email, teamId } = req.body;
            const newUser: User = {
                name,
                email,
                team: teamId
            };
            const user = await UserService.createNew(newUser);

            res.json({ user });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res
                .status(400)
                .json({ error: true, messages: [{ msg: 'User already exists' }] });
        }
    };

    const findAll = async (req: Request, res: Response) => {
        try {
            const users = await UserService.findAll();
            res.json({ users });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res
                .status(400)
                .json({ error: true, messages: [{ msg: 'An error occurred retrieving users.' }] });
        }
    };

    const update = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logger.error(NAMESPACE, 'User update - Request validation error');
            return res.status(400).json({ error: true, messages: errors.array() });
        }

        try {
            const { id } = req.params;
            const team: Schema.Types.ObjectId = req.body.teamId;

            let user = await UserService.updateUSerTeam(id, team);
            res.json({ user });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res
                .status(400)
                .json({ error: true, messages: [{ msg: 'An error occurred updating user.' }] });
        }
    };

    const deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await UserService.deleteUSer(id);
            res.json({ msg: 'Deleted succesfully.' });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res
                .status(400)
                .json({ error: true, messages: [{ msg: 'An error occurred deleting user.' }] });
        }
    };

    return {
        register,
        findAll,
        update,
        deleteUser
    };
};

export default UserController();
