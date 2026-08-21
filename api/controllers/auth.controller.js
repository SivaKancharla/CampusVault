import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import errrorHandler from '../utils/error.js';

const signup= async (req,res,next) =>{
    const {username,email,password}=req.body;

    if(!username || !email || !password ||
         username==="" || email==="" || password===""){
            // return res.status(400).json({message :'All fields are required'});
            next(errrorHandler(400,'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
    });
    try{
        await newUser.save();
        res.json("Signup successful");
    }catch(error){
        // console.log('this came means you entered a existing value');
        next(error);
    }
}

export default signup;