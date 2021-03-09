import express, { Application, NextFunction } from "express";
const app: Application = express();

// import Routes
import ApplicationRouter from "./routes/Applications";

// adding express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(
  (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    response.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
  }
);

//endpoints
app.use("/users", ApplicationRouter);
app.use("/forms/frontier", ApplicationRouter);

// we would be exporting this component to make testing easier.
export default app;
