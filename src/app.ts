import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes";
import requiRoutes from "./routes/requi.routes";

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    legacyHeaders: false,
    message: "Too many request from this IP, please try again after an hour"
});

app.set('port', process.env.PORT || 8000);

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(limiter);

//Rutas
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bienvenido, por favor autentifíquese y envié un servicio válido para empezar.',
        documentacion: 'Pendiente.'
    });
});

app.use('/api', authRoutes);
app.use('/api', requiRoutes);

export default app;