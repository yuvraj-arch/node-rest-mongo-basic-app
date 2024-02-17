const express = require('express');
const cors = require('cors');
var util = require('util');
var encoder = new util.TextEncoder('utf-8');

const app = express();

var corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to demo application.' });
});

require('./routes/products.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const http = require('http');
// const express = require('express');
// const routes = require('./routes');

// const server = http.createServer(routes);

// server.listen(3000);
