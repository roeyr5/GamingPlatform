const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const gameRoute = require('./routes/gamesRoute'); 
const authRoute = require('./routes/auth')
const leaderboardRoute = require('./routes/leaderboardRoute');
const ticTacToeRoute = require('./routes/ticTacToeRoute');


dotenv.config();  

const app = express();
app.use(cors());  
app.use(express.json());  

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  
  
app.use('/api/auth', authRoute);
app.use('/api/leaderboard', leaderboardRoute); 
app.use('/api/tic-tac-toe', ticTacToeRoute);



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
