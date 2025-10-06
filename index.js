import express from 'express'

// const urlRoute = require('./routes/url');
import urlRoute from './routes/url.js'

import dbInit from './dbInit.js';
import URL from './models /url.js';
import { handleAnalyticsData } from './controllers/url.js';

const app = express() ;
const PORT = 8001 ;
dbInit();

app.use(express.json());

app.use('/url', urlRoute)

app.get('/:shortId', async (req, res)=>{
    // console.log(req.params)
    const shortId = req.params.shortId ;
    // console.log(shortId, 'yeh waala 2 bla bla bla')
    const result = await URL.findOne({where : {shortId}});
    // console.log(result, 'yaha')
    if(!result)
        res.status(404).json({status : "404 not found" , message : "data is not present"});
    const updatedhistory = [...result.visitHistory , {timestamp : new Date()}]
    console.log(updatedhistory)
    await URL.update({
        visitHistory : updatedhistory
        
    }, {where : {shortId}})

    return res.redirect(result.redirectUrl)

})

app.get('/analytics/:shortId', handleAnalyticsData)

app.listen(PORT , () => console.log(`server started on port : ${PORT}`));

