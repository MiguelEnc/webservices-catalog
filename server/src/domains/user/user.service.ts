import { Schema } from 'mongoose';
import UserModel, { User } from './user.model';
import UserAlreadyExistisError from './errors/UserAlreadyExistsError';

const UserService = {
    findAll: async () => {
        return await UserModel.find({});
    },

    createNew: async (newUser: User) => {
        // Check if an user with same email already exists
        let user = await UserModel.findOne({ email: newUser.email });
        if (user) {
            throw new UserAlreadyExistisError(newUser.email);
        }

        user = new UserModel(newUser);

        await user.save();

        return user;
    },

    updateUSerTeam: async (id: String, teamId: Schema.Types.ObjectId) => {
        let user = await UserModel.findByIdAndUpdate(id, { team: teamId }, { new: true });
        return user;
    },

    deleteUSer: async (id: String) => {
        await UserModel.findByIdAndDelete(id);
    }
};

export default UserService;
