const express = require('express');
const cors = require('cors'); // Required for cross-origin resource sharing (especially with your Ionic app)
const bodyParser = require('body-parser');
const contactRouter = require('./api/routes/contactRouter');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/contacts', contactRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
