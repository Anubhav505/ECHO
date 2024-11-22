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
const ensureAuthenticated = require("./middlewares/authMiddleware");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');

const PORT = process.env.PORT || 8080;

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

app.use(cors({
  // origin: 'http://localhost:5173',
  origin: 'https://echo-fj1l.onrender.com',
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: 'https://echo-fj1l.onrender.com',
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.register(new User({ username, email }), password);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user);
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  res.status(401).json({ message: "User not authenticated" });
});

app.get('/dashboard', (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render('post');
  } else {
    res.redirect('/login');
  }
});

app.get('/api/create-room', (req, res) => {
  const roomId = uuidv4().slice(0, 8);
  res.json({ roomId });
});

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

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});