import express from "express"; // Express
import https from "https"; // HTTPS
import fs from "fs"; // Path Module
import morgan from "morgan"; // Logger
import cors from "cors"; // Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // Parse Cookies from Client

import session from "express-session"; // Sessions/Cookies
import RedisStore from "connect-redis"; // Session Caching
import { createClient } from "redis";

import restaurants from "./routes/restaurants.mjs"; // Restaurant Route
import users from "./routes/users.mjs"; // User Route

const app = express(); // Initialize Express App

// Built-In/Third-Party Middleware
app.use(cookieParser());
app.use(express.json()); // Body-Parser
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your front-end's URL
    credentials: true,
  })
);

// SESSION STORAGE (CACHING)
const redisClient = createClient({
  host: "localhost", // Redis server host
  port: 6379, // Redis server port
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

const redisStore = new RedisStore({ client: redisClient });
redisClient.connect().catch(console.error);

// USER SESSION
app.use(
  session({
    store: redisStore,
    key: "current_user",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    credentials: true,
    cookie: {
      sameSite: true,
      httpOnly: true,
      secure: false,
      maxAge: 3600000 / 12,
    }, // Session duration: 5 minutes
  })
);

// ROUTES
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", users);
apiRouter.use("/restaurants", restaurants);

// HTTPS CONFIGURATION
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/restaurant-review-jihoon.com-0002/cert.pem",
//   "utf8"
// );
// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/restaurant-review-jihoon.com-0002/privkey.pem",
//   "utf8"
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/restaurant-review-jihoon.com-0002/chain.pem",
//   "utf8"
// );

// const credentials = { key: privateKey, cert: certificate, ca: ca };
// const httpsServer = https.createServer(credentials, app);

// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
