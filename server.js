const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = 3000;

// Serve static files (like your HTML and JavaScript files)
app.use(express.static('public'));
// Parse incoming data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Database connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the database');
});

// Define a schema for the Messages collection
const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const accountSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
})

// Create a model for the Messages collection
const Message = mongoose.model('Message', messageSchema);
const Account = mongoose.model('Account', accountSchema);

app.post('/signup', async (req, res) => {
  try{
    const username = req.body.username;
    const password = req.body.password;
    const account = new Account({
      username: username,
      password: password,
    });
    await account.save();
    res.json({success: true, username: username});
  }
  catch(error){
    console.log(error);
    res.json({success: false, message: error.message});
  }
});

app.post('/login', async (req, res) => {
  try{
    // check if username and password match what is in the database
    const username = req.body.username;
    console.log(username)
    const password = req.body.password;
    const found_account = await Account.findOne({username: username});
    console.log(found_account)
    if (found_account && found_account.password == password){
      // if so, send back a success message
      res.json({success: true, username: username});
    }
    else{
      // if not, send back an error message
      res.json({success: false, message: 'Incorrect username or password'});
    }
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.get('/get-messages', async (req, res) => {
  try {
    // Define the time to live in minutes
    const timeToLiveInMinutes = 60; // Change this to your desired value

    // Calculate the timestamp based on the time to live
    const timeToLiveInMillis = timeToLiveInMinutes * 60 * 1000;
    const currentTime = new Date();
    const timestampToDelete = new Date(currentTime - timeToLiveInMillis);

    // Delete messages older than the calculated timestamp
    await Message.deleteMany({ createdAt: { $lt: timestampToDelete } });


    // Retrieve the remaining messages
    const messages = await Message.find({}).exec();

    res.json({
      messages: messages,
    });
  } catch (error) {
    console.error('Error retrieving and deleting messages:', error);
    res.sendStatus(500);
  }
});


app.post('/send-message', async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const messageText = req.body.message;

    console.log('Received message from frontend:', messageText);

    // Create a new message document with the createdAt field set
    const message = new Message({
      username: username,
      text: messageText,
      createdAt: new Date(), // Set the createdAt field to the current date and time
    });

    try {
      await message.save();
      console.log('Message saved to the database');
      res.sendFile(__dirname + '/public/index.html'); // Send the client back to the homepage
    } catch (error) {
      console.error('Error saving message:', error);
      res.sendStatus(500); // Send an "Internal Server Error" status code
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
