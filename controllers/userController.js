import dotenv from 'dotenv';
import Joi from 'joi'
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import User from '../models/userModel.js';

dotenv.config()

// Joi User Validation Schema
const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });


// POST Controller Register User
const userRegister = async (request,response) => {
    try{
        const validateUser = await userValidationSchema.validateAsync(request.body);
        const hashedPassword = await argon2.hash(validateUser.password);
        const user = new User({
            username:validateUser.username,
            email:validateUser.email,
            password:hashedPassword
        });
        await user.save();
        response.status(201).json({ message: 'User register successfully'});
    }catch(error){
        response.status(400).json({ error: error.message });
    }
}

// POST Controller Login User
const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        let exist = await User.findOne({ email: email });
        if (!exist) {
            return response.status(401).json({ message: 'User Not Found' });
        }
        const isPasswordCorrect = await argon2.verify(exist.password, password);
        if (!isPasswordCorrect) {
            return response.status(401).json({ message: "Password Not Match" });
        }
        let payload = {
            id : exist?.id,
            username:exist?.username,
            email:exist?.email,
        }
        const jwtToken =  jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"30d"})
        return response.status(200).json({ jwtToken });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}

export {userRegister,userLogin}