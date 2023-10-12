import express from "express";
import morgan from "morgan";
const app = express();

app.use(express.json()); // built-in body-parser
app.use(morgan("dev")); // third-party logger

app.get("/restaurants", (req, res) => {
  res.send("this is a get response");
});

app.get("/restaurants/:id", (req, res) => {
  res.send("this is a get response");
});

app.post("/restaurants", (req, res) => {
  res.send("this is a post response");
});

app.put("/restaurants/:id", (req, res) => {
  res.send("this is a put response");
});

app.delete("/restaurants/:id", (req, res) => {
  console.log("this is a delete response");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
