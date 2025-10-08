import { ConnectionRefusedError } from "sequelize";
import { getUser } from "../service/auth.js";


 function accessToLogin(req, res , next)
{
    const uuid = req.cookies.uid;
    if(!uuid)
    {
        console.log('in authmiddleware uuid validtaoion')
        return res.redirect('/login');
    }

    let user = getUser(uuid);
    console.log('if we have user here ', user)
    if(!user)
    {
        console.log("user nahi mila ")
        return res.redirect('/login');
    }

    req.user = user ;
    next();
}


 export function checkAuth(req, res , next)
{
    const uuid = req.cookies.uid;
    // if(!uuid)
    // {
    //     console.log('in authmiddleware uuid validtaoion')
    //     return res.redirect('/login');
    // }

    let user = getUser(uuid);
    console.log('if we have user here ', user)
    // if(!user)
    // {
    //     console.log("user nahi mila ")
    //     return res.redirect('/login');
    // }

    req.user = user ;
    next();
}

export default accessToLogin;