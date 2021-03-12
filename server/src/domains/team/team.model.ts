import { Schema, model, Document } from 'mongoose';

export interface Team {
    name: String;
    email: String;
    members: Array<Schema.Types.ObjectId>;
    services: Array<Schema.Types.ObjectId>;
}

interface TeamDocument extends Team, Document {}

const TeamSchema: Schema = new Schema({
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
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }
    ]
});

export default model<TeamDocument>('Team', TeamSchema);
