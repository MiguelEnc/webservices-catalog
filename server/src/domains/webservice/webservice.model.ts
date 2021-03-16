import { model, Schema, Document } from 'mongoose';

export interface Webservice {
    name: String;
    version: String;
    status: String;
    type: String;
    soaType: String;
    cbProject: Boolean;
    configurationPlan: Boolean;
    domain: String;
    team: Schema.Types.ObjectId;
    description: String;
    operations: Array<Operation>;
    endpoints: Array<Endpoint>;
}

export interface Operation {
    name: String;
    description: String;
    request: String;
    response: String;
}

export interface Endpoint {
    env: String;
    url: String;
}

interface WebserviceDocument extends Webservice, Document {}

const WebserviceSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    soaType: {
        type: String,
        required: true
    },
    cbProject: {
        type: Boolean,
        required: true,
        default: true
    },
    configurationPlan: {
        type: Boolean,
        required: true,
        default: false
    },
    domain: {
        type: String,
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    description: {
        type: String,
        required: true
    },
    operations: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            request: {
                type: String,
                required: true
            },
            response: {
                type: String,
                required: true
            }
        }
    ],
    endpoints: [
        {
            env: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ]
});

export default model<WebserviceDocument>('Service', WebserviceSchema);
