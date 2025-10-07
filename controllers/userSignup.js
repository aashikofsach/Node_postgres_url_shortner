
import User from "../models /users.js";

 export const handlerUserSignup = async (req , res)=>
{
    const {id , name , email , password } = req.body ;

    const newUser = await User.create({id , name , email , password})
    console.log(newUser)


    return res.render('home')
}