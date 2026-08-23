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
    if (req.body.password!== undefined){
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
        req.body.password =await  bcryptjs.hashSync(password, 10);
    }

    if (req.body.username!==undefined) {
        const username = req.body.username.trim();
        console.log(username);
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
        req.body.username = username;
    }

    if(req.body.email!==undefined){
        const email = req.body.email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return next(
                errorHandler(400, 'Please provide a valid email address')
            );
        }
        //uncomment below if no need of clg mail restriction 
        // if (!email.toLowerCase().endsWith('@iitism.ac.in')) {
        //     return next(
        //         errorHandler(400, 'Please use your IIT(ISM) college email address')
        //     );
        // }
        req.body.email = email;
    }
    const updateFields = {};

    if (req.body.username !== undefined) {
        updateFields.username = req.body.username;
    }

    if (req.body.email !== undefined) {
        updateFields.email = req.body.email;
    }

    if (req.body.profilePicture !== undefined) {
        updateFields.profilePicture = req.body.profilePicture;
    }

    if (req.body.password !== undefined) {
        updateFields.password = req.body.password;
    }
    if (Object.keys(updateFields).length === 0) {
        return next(errorHandler(400, 'No changes were made'));
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: updateFields,
            },
            { new: true }
        );
        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export default test;