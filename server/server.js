import express from "express";
import cors from "cors";

const app = express();


app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
