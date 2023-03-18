const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './.env.local' })

// Set up database configuration (Mongoose)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema for new users
const userSchema = new Schema({
  username: { type: String, required: true }
})

// Create model for userSchema
const User = mongoose.model("User", userSchema);

// Manage app 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// My code starts here...
app.post('/api/users', (req, res) => {
  const name = req.body.username;
  // Check if user already exists in database
  User.findOne({ username: name })
    .then(result => {
      // If it doesn't exists, create a new instance of User model
      if (result === null) {
        const user = new User({
          username: name
        })
        // Create a new user in database
        user.save()
          .then(user => {
            // If it was created successfully, return json response on client-side
            res.json({ username: name, _id: user._id })
          })
          // Show error if user wasn't created successfully
          .catch(error => {
            console.log(error)
          })
      } else {
        // If user already exists in database, return json response on client-side
        res.json({username: name, _id: result._id})
      }
    })
    // Show error if the search was not possible
    .catch(error => {
      console.log(error)
    })
})



// My code finishes here.

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
