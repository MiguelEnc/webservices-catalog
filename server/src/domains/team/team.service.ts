import { Schema } from 'mongoose';
import TeamModel, { Team } from './team.model';
import TeamAlreadyExistsError from './errors/TeamAlreadyExistsError';
import TeamNotFoundError from './errors/TeamNotFoundError';
import AlreadyContainsElementError from '../../utility/AlreadyContainsElementError';

const TeamService = {
    findAll: async () => {
        const teams = await TeamModel.find({});
        return teams;
    },

    findById: async (id: String) => {
        const team = await TeamModel.findById(id);
        return team;
    },

    createNew: async (newTeam: Team) => {
        // Check if a team with same name and email already exists
        let { name, email } = newTeam;
        let team = await TeamModel.findOne({ $or: [{ name }, { email }] });
        if (team) {
            throw new TeamAlreadyExistsError(name, email);
        }

        team = new TeamModel(newTeam);

        await team.save();

        return team;
    },

    addMember: async (id: String, user: Schema.Types.ObjectId) => {
        let team = await TeamModel.findById(id);
        if (!team) {
            throw new TeamNotFoundError(id);
        }

        if (team.members.includes(user)) {
            throw new AlreadyContainsElementError('Team', 'Member');
        }

        team = await TeamModel.findByIdAndUpdate(
            id,
            { members: [...team.members, user] },
            { new: true }
        );
        return team;
    },

    addService: async (id: String, service: Schema.Types.ObjectId) => {
        let team = await TeamModel.findById(id);
        if (!team) {
            throw new TeamNotFoundError(id);
        }

        if (team.members.includes(service)) {
            throw new AlreadyContainsElementError('Team', 'Service');
        }

        team = await TeamModel.findByIdAndUpdate(
            id,
            { services: [...team.services, service] },
            { new: true }
        );
        return team;
    },

    deleteTeam: async (id: String) => {
        await TeamModel.findByIdAndDelete(id);
    }
};

export default TeamService;
