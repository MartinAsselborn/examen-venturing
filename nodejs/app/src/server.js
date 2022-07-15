const express = require('express')
const app = express()
const port = 4050
app.listen(
  port, 
  () => console.log(`app listening at http://localhost:${port}`)
);

const routes =require('./routes');
const cors = require('cors');
app.use(cors());
app.use('/api', routes);