import express from "express";
const ApplicationRouter = express.Router();
import ApplicationsController from "../controllers/Applications";

ApplicationRouter.post("/applications", ApplicationsController);

export default ApplicationRouter;
