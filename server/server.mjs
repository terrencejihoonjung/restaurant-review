import express from "express";
import morgan from "morgan";
import cors from "cors";
import restaurants from "./routes/restaurants.mjs";
import users from "./routes/users.mjs";
import verifyToken from "./middleware/verifyJWT.mjs";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json()); // built-in body-parser
app.use(morgan("dev")); // third-party logger
app.use(cors());

app.use("/users", users);
app.use("/restaurants", restaurants);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
