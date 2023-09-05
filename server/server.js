import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.js'

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://lmercedes03:kWfRIlNOecaTp8rU@cluster0.wssqiab.mongodb.net/eoi_form?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err.message));

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

