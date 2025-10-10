
import shortid from 'shortid';
import URL from '../models/url.js';

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
        visitHistory : [],
        createdBy : req.user.id



    })
    console.log('here till line 24')

    return res.render('home',{
        id : shortId

    })

    // return res.json({
    //     id:shortId
    // })



}

export const handleAnalyticsData = async (req, res) =>
{
    const shortId = req.params.shortId;

    const result = await URL.findOne({where : {shortId}});
    console.log(result)

    return res.json({
        totalClicks : result.visitHistory.length ,
        analytics : result.visitHistory
    })
}

