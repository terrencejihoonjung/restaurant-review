import express from "express";
const app = express();

app.get("/restaurants", (req, res) => {
  res.send("this is a get response");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
