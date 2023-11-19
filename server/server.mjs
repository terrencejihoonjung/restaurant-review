import express from "express";
import morgan from "morgan";
import cors from "cors";
import restaurants from "./routes/restaurants.mjs";
import users from "./routes/users.mjs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import https from "https";
import fs from "fs";
import { createClient } from "redis";
import process from "process";

// Log the user information
console.log("User:", process.env.USER); // User account name
console.log("UID:", process.getuid()); // User ID
console.log("GID:", process.getgid()); // Group ID

dotenv.config();
const app = express();

const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/restaurant-review-jihoon.com/fullchain.pem",
  "utf8"
);
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/restaurant-review-jihoon.com/privkey.pem",
  "utf8"
);
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

app.use(express.json()); // built-in body-parser
app.use(morgan("dev")); // third-party logger

// cross-origin-resource-sharing
app.use(
  cors({
    origin: "https://restaurant-review-eight.vercel.app", // Replace with your front-end's URL
    credentials: true,
  })
);
app.use(cookieParser()); // Parse incoming cookies from client

// Connect to Redis
const redisClient = createClient({
  host: "54.67.56.212", // Redis server host
  port: 6379, // Redis server port
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Enable sessions for user auth
const redisStore = new RedisStore({ client: redisClient });
redisClient.connect().catch(console.error);

app.use(
  session({
    store: redisStore,
    key: "current_user",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    credentials: true,
    cookie: { maxAge: 3600000 / 6 }, // Session duration: 1 hour
  })
);

app.use("/users", users);
app.use("/restaurants", restaurants);

const PORT = process.env.PORT || 3000;
httpsServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
