require('dotenv').config();

const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');

const PORT = process.env.PORT || 8080;

// Session middleware (ensure it's before passport middleware)
app.use(session({
  secret: 'goatismonkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
}));

// CORS setup
app.use(cors({
  origin: 'https://echo-fj1l.onrender.com',  // Update with your front-end URL
  credentials: true,
}));

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: 'https://echo-fj1l.onrender.com',  // Update with your front-end URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up Passport LocalStrategy
passport.use(new LocalStrategy(User.authenticate())); // Ensure you're using the right method from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL);

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.register(new User({ username, email }), password); // This uses passport-local-mongoose's register method
    res.sendStatus(201); // Created
  } catch (e) {
    console.log(e);
    res.sendStatus(500); // Internal server error
  }
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Authentication failed" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json(user); // Respond with the logged-in user
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user); // Send the authenticated user
  }
  res.status(401).json({ message: "User not authenticated" });
});

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('post'); // Adjust with your actual route or render
  } else {
    res.redirect('/login');
  }
});

app.get('/api/create-room', (req, res) => {
  const roomId = uuidv4().slice(0, 8);
  res.json({ roomId });
});

// Socket.io events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(`Message sent to room ${data.room}: ${data.message}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
