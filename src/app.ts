import express from "express";
import cors from 'cors';
import authRouter from "./modules/auth/auth.route";

const app = express();

app.use(cors({origin: "http://localhost:4000"}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/auth", authRouter);

export default app;
