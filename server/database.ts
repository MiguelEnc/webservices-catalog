import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config';
import logger from './src/utility/logger';

const MongoConnector = () => {
    const NAMESPACE = 'Mongo';

    const mongoOptions: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    const connect = async (): Promise<void> => {
        try {
            await mongoose.connect(config.db.url, mongoOptions);
            logger.info(NAMESPACE, 'MongoDB connected.');
        } catch (err) {
            logger.error(NAMESPACE, err.message, err);
        }
    };

    const disconnect = async (): Promise<void> => {
        try {
            await mongoose.connection.close();
            logger.info(NAMESPACE, 'MongoDB disconnected.');
        } catch (err) {
            logger.error(NAMESPACE, err.message, err);
        }
    };

    return {
        connect,
        disconnect
    };
};

export default MongoConnector();
