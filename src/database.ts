import { connect, set } from "mongoose";
import config from './config/config'

(async () => {
    try {
        set('strictQuery', false);
        const db = await connect(config.DB.URI);
        console.log('DB connected to', db.connection.name);
        
    } catch (error) {
        console.error(error);
    }
})();