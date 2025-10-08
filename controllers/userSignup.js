
import User from "../models /users.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser, getUser } from "../service/auth.js";

 export const handlerUserSignup = async (req , res)=>
{
    const {id , name , email , password } = req.body ;

    const newUser = await User.create({id , name , email , password})
    // console.log(newUser)


    // return res.render('home')
    return res.redirect('/')
}

export const handleUserLogin = async (req, res) =>
{
    const {email , password } = req.body ;

    const user = await User.findOne({where : {email, password}});

    if(!user)
    {
        console.log('mistake')
        return res.render('login', {error : "Invalid User Credentials "})
    }

    // const sessionId = uuidv4() ;
    const token =setUser( user);
    res.cookie('uid', token)

    console.log(user, "line number 27")
    // return res.render('home')
        return res.redirect('/')


}