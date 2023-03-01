import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand'
import path from 'path';

const config = dotenv.config();
dotenvExpand.expand(config);

export default {
    jwtSecret: process.env.JWT_SECRET || 'YOUR JWT SECRET HERE',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://db-requisiciones:27017/requisiciones',
    }
}