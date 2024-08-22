require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const aboutMeRoutes = require('./routes/aboutMeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const singleProductRoutes = require('./routes/singleProductRoutes');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3001', 'http://localhost:3000', 'https://fitfit-navy.vercel.app']
}));
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', bannerRoutes);
app.use('/api', aboutMeRoutes);
app.use('/api', commentRoutes);
app.use('/api', paymentRoutes);
app.use('/api', singleProductRoutes);


// Sync database and start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log('Error connecting to the database', error);
  });