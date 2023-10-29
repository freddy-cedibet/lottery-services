const express = require('express');
const Consul = require('consul');

const app = express();
const port = 6001;
// const consul = new Consul();
const consul = new Consul({
  host: 'consul', // Consul service name in docker-compose
  port: 8500
});
const serviceName = 'ticket-service'; // Name of your service

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`${serviceName} service listening at http://localhost:${port}`);

  // Register with Consul
  consul.agent.service.register({
    name: serviceName,
    address: serviceName, // Use Docker service name as address
    port: port,
    check: {
      http: `http://${serviceName}:${port}/health`,
      interval: '10s'
    }
  }, (err) => {
    if (err) throw err;
  });
});

// Optional: Deregister on app termination
process.on('SIGINT', () => {
  consul.agent.service.deregister(serviceName, (err) => {
    if (err) console.error(err);
    process.exit();
  });
});
