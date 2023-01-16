import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand'

const config = dotenv.config();
dotenvExpand.expand(config);

export default {
    jwtSecret: process.env.JWT_SECRET || 'YOUR JWT SECRET HERE',
    DB: {
        URI: process.env.MONGODB_URI || 'YOUR MONGODB URI HERE',
    }
}