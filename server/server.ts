import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";

class Server {
  app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.initRoutes();
  }
  
  config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  initRoutes() {
    this.app.use("/", (req, res) => res.send("OK."));
  }

  start() {
    const PORT = this.app.get("port");
    this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
  
}

const server = new Server();
server.start();