import jwt from "jsonwebtoken";
const secret = 'aashu@123'

export function setUser( user)
{

   return jwt.sign(
    {
        id : user.id,
        email : user.email
    }, secret)
}

export function getUser(token)
{
    if(!token)
    {
        return null
    }
try {

    let value = jwt.verify(token , secret);
    console.log(value , 'radhe radhe')
   return jwt.verify(token , secret)
    
} catch (error) {
    return null ;
    
}

}
