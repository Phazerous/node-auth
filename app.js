const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000);

app.use(authRoutes);
