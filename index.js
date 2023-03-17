const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// Set up database configuration (Mongoose)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema for new users
const userSchema = new Schema({
  username: [string]
})

// Create model for userSchema
const User = mongoose.model("User", userSchema);

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
