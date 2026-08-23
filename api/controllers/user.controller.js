import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

const test=(req,res)=>{
    res.json({message: 'test API is working fine!!'});
};
export const updateUser=async (req,res,next)=>{
    // console.log("user.controller.js is called after the verifyUser");
    // console.log(req.user.id , req.params.userId); // req contains the user data that came through cookie
    
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.password){
        const { password } = req.body;
        if(password !== password.trim()) {
            return next(errorHandler(400,'Password cannot start or end with spaces'));
        }
        if(!password ||password.length < 8 ||
            !/[A-Z]/.test(password) ||!/[a-z]/.test(password) ||
            !/[0-9]/.test(password)
        ){
            return next(errorHandler(400,'Password must be at least 8 characters and contain uppercase, lowercase, and a number'));
        }
        req.body.password = bcryptjs.hashSync(password, 10);
    }
    if (req.body.username) {
        const username = req.body.username.trim();
        if (username.length < 3 || username.length > 20) {
            return next(
                errorHandler(400, 'Username must be between 3 and 20 characters')
            );
        }
        if (!/^[a-zA-Z]/.test(username)) {
            return next(
                errorHandler(400, 'Username must start with a letter')
            );
        }
        if (!/^[a-zA-Z0-9._]+$/.test(username)) {
            return next(
                errorHandler(
                    400,
                    'Username can only contain letters, numbers, dots and underscores'
                )
            );
        }
        if (username.includes('..') || username.includes('__')) {
            return next(errorHandler(400,'Username cannot contain consecutive dots or underscores'));
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
            $set: { //if there then only set will update
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },
        },{ new: true } );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export default test;