import { Schema } from 'mongoose';
import UserModel from './user.model';
import UserAlreadyExistisError from './errors/UserAlreadyExistsError';

const UserService = {
    findAll: async () => {
        return await UserModel.find({});
    },

    createNew: async (name: String, email: String, teamId: String) => {
        // Check if an user with same email already exists
        let user = await UserModel.findOne({ email });
        if (user) {
            throw new UserAlreadyExistisError(email);
        }

        user = new UserModel({
            name,
            email,
            team: teamId
        });

        await user.save();

        return user;
    },

    updateTeam: async (id: String, teamId: Schema.Types.ObjectId) => {
        let user = await UserModel.findByIdAndUpdate(id, { team: teamId });
        return user;
    }
};

export default UserService;
