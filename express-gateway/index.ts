import * as  express from 'express';
import * as cors from 'cors';
import { addRespondToResponse } from './src/middlewares/response';
import { handleError } from './src/middlewares/errors'
// import { attachPublicRoutes } from './src/routes';
import * as path from "path";
import * as Consul from 'consul';

const port = 8081
const serviceName = 'gateway'
const consul = new Consul({
    host: 'consul', // Consul service name in Docker Compose
    port: "8500"
})


const initializeExpress = (): void => {
    const app = express();

    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(addRespondToResponse)

    app.use(handleError)

    app.listen( port,() => {
        console.log(`Server listening on ${port}`)
        // Register with Consul
        consul.agent.service.register({
          name: serviceName,
          address: serviceName, // Use Docker service name as address
          port,
          check: {
            http: `http://${serviceName}:${port}/health`,
            interval: '10s'
          }
        }, (err) => {
          if (err) throw err;
        });
    })

    process.on('SIGINT', () => {
        consul.agent.service.deregister(serviceName, (err) => {
            if (err) console.error(err);
            process.exit();
        });
    });

}

const initializeApp = async (): Promise<void> => {
    initializeExpress();
}

initializeApp();