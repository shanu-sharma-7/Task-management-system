const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
