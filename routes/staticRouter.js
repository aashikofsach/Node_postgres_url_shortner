import express from 'express';
import URL from '../models /url.js';

const router = express.Router() ;

router.get('/', async (req, res)=>
{
    const allUrls  = await URL.findAll({raw:true});
    console.log(allUrls)
    return res.render('home', {
        urls : allUrls

    })
})

router.get('/signup', (req, res)=>
{
    return res.render('signup')
})

router.get('/login', (req, res)=> {
    return res.render('login')
})



export default router;