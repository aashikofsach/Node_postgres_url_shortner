import express from 'express'

// const urlRoute = require('./routes/url');
import urlRoute from './routes/url.js'

import dbInit from './dbInit.js';

const app = express() ;
const PORT = 8001 ;
dbInit();

app.use(express.json());

app.use('/url', urlRoute)

app.listen(PORT , () => console.log(`server started on port : ${PORT}`));

