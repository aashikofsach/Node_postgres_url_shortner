import express from 'express'
import cookieParser from 'cookie-parser';

// const urlRoute = require('./routes/url');
import urlRoute from './routes/url.js'

import dbInit from './dbInit.js';
import URL from './models /url.js';
import path from "path"
import { handleAnalyticsData } from './controllers/url.js';
import staticRoute from "./routes/staticRouter.js";
import userRouter from './routes/userRouter.js';
import  { checkAuthentication, restrictTo } from './middleware/authmiddleware.js';
// import accessToLogin from './middleware/auth.js';
// import { accessToLogin } from './middleware/auth.js';



const app = express() ;
const PORT = 8001 ;
dbInit();
app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/user',userRouter);


app.use(checkAuthentication)


// 
// 
app.use('/url', restrictTo(['normal']),urlRoute);
app.use('/' , staticRoute)


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

app.get('/analytics/:shortId', handleAnalyticsData);
app.get('/url/test', async (req, res)=>
{
    const result = await URL.findAll({raw : true});
    console.log(result, '843785')
    return res.render('home', {
        urls : result
    })
})


app.listen(PORT , () => console.log(`server started on port : ${PORT}`));

