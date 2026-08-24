import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup= async (req,res,next) =>{
    const {username,email,password}=req.body;

    if(!username || !email || !password ||
         username==="" || email==="" || password===""){
            // return res.status(400).json({message :'All fields are required'});
            return next(errorHandler(400,'All fields are required'));
            //we get next(error) which will trigger Error-handling middleware ,
            //  if not written any Error-handling middleware a defaultErrorHandler is triggered 
            // and that will send the error response to client
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    // console.log(hashedPassword);

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
    });
    try{
        await newUser.save();
        res.json("Signup successful");
    }catch(error){
        // console.log('this came means you entered a existing value or a problem with mongoDB side');
        next(error);
    }
}

export const signin=async (req,res,next)=>{
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        //if need the signin to remember for x days write {expiresIn:'xd'} in below
        const token = jwt.sign( { id: validUser._id , isAdmin: validUser.isAdmin } ,process.env.JWT_SECRET );
        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
    }catch(error){
        next(error);
    }

}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id , isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;

      // Cookie options for cross-site requests
      const cookieOptions = {
        httpOnly: true,
      };

      res.status(200).cookie('access_token', token, cookieOptions).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;

      // Cookie options for cross-site requests
      const cookieOptions = {
        httpOnly: true,
      };
      
      res.status(200).cookie('access_token', token, cookieOptions).json(rest);
    }
  } catch (error) {
    next(error);
  }
};