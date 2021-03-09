import { model, Schema, Document } from 'mongoose';

export interface User extends Document {
    name: String;
    email: String;
    team: Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
});

export default model<User>('User', UserSchema);
