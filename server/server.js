import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js'

const app = express();

mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});


app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

