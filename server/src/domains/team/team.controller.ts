import { Request, Response } from 'express';
import TeamService from './team.service';
import { Team } from './team.model';
import { validationResult } from 'express-validator';
import Logger from '../../utility/logger';

const TeamController = () => {
    const NAMESPACE = 'TEAM';

    const findAll = async (req: Request, res: Response) => {
        try {
            const teams = await TeamService.findAll();
            res.json({ teams });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res
                .status(400)
                .json({ errors: [{ msg: 'An error occurred retrieving teams.' }] });
        }
    };

    const findById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            let team = TeamService.findById(id);
            res.json({ team });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res
                .status(400)
                .json({ errors: [{ msg: 'An error occurred retrieving team.' }] });
        }
    };

    const register = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logger.error(NAMESPACE, 'Team registration - Request validation error');
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, members, services } = req.body;
            const team: Team = {
                name,
                email,
                members: members ? members : [],
                services: services ? services : []
            };

            let newTeam = await TeamService.createNew(team);
            res.json({ newTeam });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ errors: [{ msg: 'An error occurred creating team.' }] });
        }
    };

    const update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { members, services } = req.body;

            let updatedTeam: any = {};
            if (members) {
                updatedTeam = await TeamService.addMember(id, members);
            }
            if (services) {
                updatedTeam = await TeamService.addService(id, services);
            }

            res.json({ team: updatedTeam });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ errors: [{ msg: 'An error occurred updating team.' }] });
        }
    };

    const deleteTeam = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await TeamService.deleteTeam(id);
            res.json({ msg: 'Deleted succesfully.' });
        } catch (err) {
            Logger.error(NAMESPACE, err.message, err);
            return res.status(400).json({ errors: [{ msg: 'An error occurred deleting team.' }] });
        }
    };

    return {
        register,
        findAll,
        findById,
        update,
        deleteTeam
    };
};

export default TeamController();
