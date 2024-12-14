const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars from the root of the backend folder
dotenv.config();  // За замовчуванням шукає .env в кореневій папці

const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use('/api/chats', chatRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
