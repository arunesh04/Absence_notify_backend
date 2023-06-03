const mongoose = require('mongoose');
const cors = require('cors')
const express = require('express');
const app = express();
const router = require('./router');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Notifyapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Db connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/api', router);

const port = 8000;
app.listen(port, () => {
    console.log(`Listening at post ${port}`)
})
