const express = require('express');
const app = express();
const port = 3001;

app.get('/users/:id', (req, res) => {
  // logic to handle fetching a user
});

app.post('/users', (req, res) => {
  // logic to handle creating a user
});

app.put('/users/:id', (req, res) => {
  // logic to handle updating a user
});

app.delete('/users/:id', (req, res) => {
  // logic to handle deleting a user
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
