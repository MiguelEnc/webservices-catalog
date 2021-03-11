import { Schema, model } from 'mongoose';

export interface Team {
    name: String;
    email: String;
    members: Array<Schema.Types.ObjectId>;
    services: Array<Schema.Types.ObjectId>;
}

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

export default model('Team', TeamSchema);
