import { ConnectionRefusedError } from "sequelize";
import { getUser } from "../service/auth.js";


 function accessToLogin(req, res , next)
{
    // const uuid = req.cookies.uid;   we not using cookies , to get token 
    const uuid = req.headers['authorization']
    if(!uuid)
    {
        console.log('in authmiddleware uuid validtaoion')
        return res.redirect('/login');
    }
const token  = uuid.split(' ')[1];
console.log(token , "here is our token line")
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
    // const uuid = req.cookies.uid;
        const uuid = req.headers['authorization']

    // if(!uuid)
    // {
    //     console.log('in authmiddleware uuid validtaoion')
    //     return res.redirect('/login');
    // }
const token  = uuid.split(' ')[1];

    let user = getUser(token);

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