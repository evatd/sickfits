// here we spin up our version of graphQL yoga
// we need config as we don't have .env file, we have a custom env file name
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// TODO Use express middlware to handle cookies (JWT)
// TODO Use express middlware to populate current user

// we only want this endpoint to be visited from approved URLs - our site only
// using env vars here
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
