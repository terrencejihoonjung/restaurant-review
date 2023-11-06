import express from "express";
import morgan from "morgan";
import cors from "cors";
import restaurants from "./routes/restaurants.mjs";
import users from "./routes/users.mjs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import verifyUser from "./middleware/verifyUser.mjs";

dotenv.config();
const app = express();

app.use(express.json()); // built-in body-parser
app.use(morgan("dev")); // third-party logger
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your front-end's URL
    credentials: true,
  })
); // cross-origin-resource-sharing
app.use(cookieParser()); // Parse incoming cookies from client
app.use(
  session({
    key: "current_user",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    credentials: true,
    cookie: { maxAge: 3600000 / 6 }, // Session duration: 1 hour
  })
); // Enable sessions for user auth

app.use("/users", users);
app.use("/restaurants", restaurants);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
