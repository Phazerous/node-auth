require('dotenv').config();

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');

const mongoose = require('mongoose');
const { requireAuth } = require('./middleware/authMiddleware');

const dbURI = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@cluster0.rotclkt.mongodb.net/`;

mongoose.set('strictQuery', false);

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);

app.get('/home', requireAuth, (req, res) => res.render('home-page.ejs'));
