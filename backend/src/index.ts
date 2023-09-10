import express, { Express } from 'express';
import dotenv from 'dotenv';
import Routes from './routes.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());
// Use the route
app.use(Routes);

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

// To start, run node index.js
// To test, go to localhost:{PORT}