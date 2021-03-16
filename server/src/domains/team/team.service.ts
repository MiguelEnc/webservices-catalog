import TeamModel, { Team } from './team.model';
import TeamAlreadyExistsError from './errors/TeamAlreadyExistsError';
import TeamNotFoundError from './errors/TeamNotFoundError';

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

    addMember: async (id: String, users: Array<String>) => {
        let team = await TeamModel.findById(id);
        if (!team) {
            throw new TeamNotFoundError(id);
        }

        team = await TeamModel.findByIdAndUpdate(
            id,
            { members: [...team.members, ...users] },
            { new: true }
        );
        return team;
    },

    addService: async (id: String, services: Array<String>) => {
        let team = await TeamModel.findById(id);
        if (!team) {
            throw new TeamNotFoundError(id);
        }

        team = await TeamModel.findByIdAndUpdate(
            id,
            { services: [...team.services, ...services] },
            { new: true }
        );
        return team;
    },

    deleteTeam: async (id: String) => {
        await TeamModel.findByIdAndDelete(id);
    }
};

export default TeamService;
