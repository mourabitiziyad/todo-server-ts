import { Router } from "express";
import todoRouter from "./routes/todo";

const apirouter = Router();

apirouter.use("/", todoRouter);

export default apirouter;
