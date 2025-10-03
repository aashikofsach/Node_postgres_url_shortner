
import shortid from 'shortid';
import URL from '../models /url.js';

 export const handleGenerateNewShortUrl = async (req, res) =>
{
    const body = req.body ;
        console.log('till here it runs ')
        console.log(body.url)

    if(!body.url) return res.status(400).json({
        error : "URL not present"
    })
    const shortId = shortid() ;

    await URL.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory : []



    })
    console.log('here till line 24')

    return res.json({
        id:shortId
    })



}

