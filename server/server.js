import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js'
import cors from 'cors'

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://lmercedes03:kWfRIlNOecaTp8rU@cluster0.wssqiab.mongodb.net/eoi_form?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err.message));

// Set up routes
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

app.use('/api', apiRoutes);

app.use(cors({
  origin: 'http://127.0.0.1:5173',
}));

// Start the server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

