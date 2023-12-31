import * as  express from 'express';
import * as cors from 'cors';
import { addRespondToResponse } from './src/middlewares/response';
import { handleError } from './src/middlewares/errors'
// import { attachPublicRoutes } from './src/routes';
import * as path from "path";
import * as Consul from 'consul';
import * as morgan from 'morgan';
import {logger} from "@sentry/utils";
import {attachPublicRoutes} from "./src/routes";
// import * as winston from 'winston';
// import  logger from "./src/utils/logger"

const port = 5005
const serviceName = 'notification-service'

// const consul = new Consul({
//   host: 'consul',
//   port: "8500"
// })

require('dotenv').config();


const initializeExpress = (): void => {
  const app = express();


  const morganStream = {
    write: (message: string) => {
      // Use the 'info' log level so the output will be picked up by both transports
      logger.info(message.trim());
    },
  };

  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded())
  app.use(addRespondToResponse)
  app.use(morgan('combined', { stream: morganStream }));

  app.use(handleError)

  attachPublicRoutes(app)


  app.listen( port,() => {
    console.log(`Server listening on ${port}`)
    // Register with Consul

    app.get("/health", (req, res) => {
      res.status(200).send("OK")
    })

    // consul.agent.service.register({
    //   name: serviceName,
    //   address: serviceName, // Use Docker service name as address
    //   port,
    //   check: {
    //     http: `http://${serviceName}:${port}/health`,
    //     interval: '10s'
    //   }
    // }, (err) => {
    //   if (err) {
    //     logger.error('Error registering service with Consul', err);
    //     // throw err;
    //   }
    // });

  })

  // process.on('SIGINT', () => {
  // consul.agent.service.deregister(serviceName, (err) => {
  //   if (err) {
  //     logger.error('Error deregistering service with Consul', err);
  //     console.error(err);
  //   }
  //   process.exit();
  // });

}

const initializeApp = async (): Promise<void> => {
  initializeExpress();
}

initializeApp();