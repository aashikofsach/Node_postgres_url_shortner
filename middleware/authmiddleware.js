
import { ConnectionRefusedError } from "sequelize";
import { getUser } from "../service/auth.js";


export function checkAuthentication(req, res , next)
{
    const authorizationHeaderValue = req.headers['authorization'];
    req.user = null 
    console.log(authorizationHeaderValue, "line 10")
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer'))
    {
       return next();
    }

    const token  = authorizationHeaderValue.split(' ')[1];
        let user = getUser(token);

        req.user = user ;

        return next() ;

}

 export function restrictTo(roles = [])
{
    return function(req, res , next)
    {
        console.log('line 29 authfile')
        if(!req.user)
        {
            return res.redirect('/login')
        }
        if(!roles.includes(req.user.role) )
            return res.end("UnAuthorized")
        return next() ;
    }
}

//  function accessToLogin(req, res , next)
// {
//     // const uuid = req.cookies.uid;   we not using cookies , to get token 
//     const uuid = req.headers['authorization']
//     if(!uuid)
//     {
//         console.log('in authmiddleware uuid validtaoion')
//         return res.redirect('/login');
//     }
// const token  = uuid.split(' ')[1];
// console.log(token , "here is our token line")
//     let user = getUser(uuid);
//     console.log('if we have user here ', user)
//     if(!user)
//     {
//         console.log("user nahi mila ")
//         return res.redirect('/login');
//     }

//     req.user = user ;
//     next();
// }


//  export function checkAuth(req, res , next)
// {
//     // const uuid = req.cookies.uid;
//         const uuid = req.headers['authorization']

//     // if(!uuid)
//     // {
//     //     console.log('in authmiddleware uuid validtaoion')
//     //     return res.redirect('/login');
//     // }
// const token  = uuid.split(' ')[1];

//     let user = getUser(token);

//     console.log('if we have user here ', user)
//     // if(!user)
//     // {
//     //     console.log("user nahi mila ")
//     //     return res.redirect('/login');
//     // }

//     req.user = user ;
//     next();
// }

// export default accessToLogin;