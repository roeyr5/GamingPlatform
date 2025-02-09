const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gamesRoute'); 
const authRoutes = require('./routes/auth')

dotenv.config();  

const app = express();
app.use(cors());  
app.use(express.json());  

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  
app.use('/api/games', gameRoutes);  
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
