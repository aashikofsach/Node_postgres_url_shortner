
// import User from "../models/users.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser, getUser } from "../service/auth.js";
import User from '../models/users.js';

 export const handlerUserSignup = async (req , res)=>
{
    const {id , name , email , password } = req.body ;
        console.log('till here 1')


    const newUser = await User.create({id , name , email , password})
        console.log('till here 2')

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
    // res.cookie('uid', token). we are now using response way to instead of cookies 

    console.log(user, "line number 27")
    // return res.render('home')
        // return res.redirect('/')
        return res.json({token})


}