import UserModel from '../../models/UserModel.js';
import { services } from '../../utils/services.js';
import { userLevelTypes } from "../../config/index.js";
import Jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    try {
        let user_level = req.body.user_level;
        if (!req.body.email) {
            return res.status(400).json({ error: "Email is required", section: "email" });
        }
        if (!req.body.full_name) {
          return res.status(400).json({ error: "The name is required", section: "full_name" });
        }
        if(!user_level){
          return res.status(400).json({error: "Please select a user level, it can be: buyer, seller or admin", section: "level"})
        }
        if(user_level !== userLevelTypes.buyer && user_level !== userLevelTypes.seller && user_level !== userLevelTypes.admin ){
          return res.status(400).json({message: "The user level only can be: buyer, seller or admin", section: "level"})
        }
        if (req.body.password === "") {
            return res.status(400).json({ error: "Password cannot be empty", section: "password" });
        }
        if (req.body.repeat_password === "") {
          return res.status(400).json({ error: "Repeat password cannot be empty", section: "repeat_password" });
      }
        if (req.body.password !== req.body.repeat_password) {
          return res.status(400).json({ error: "Passwords do not match", section: "repeat_password" });
      }
        let email = req.body.email.toLowerCase().trim();
        let user = await UserModel.findOne({ email: email });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new UserModel({
            full_name: req.body.full_name,
            password: req.body.password,
            email: req.body.email,
            user_level: req.body.user_level
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return res.status(500).json({ error: err });
            }
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              if (err) {
                return res.status(500).json({ error: err });
              }
              newUser.password = hash;
              newUser.save();
              
              const payload = {
                _id: newUser._id,
                full_name: newUser.full_name,
                email: newUser.email,
                user_level: newUser.user_level
              };
              const token = Jwt.sign(payload, services.JWT_KEY, {
                expiresIn: 31556926,
              });
        
              return res.status(200).json({
                message: "User created successfully",          
                user_level: newUser.user_level,
                user_name: newUser.full_name,
                token: token,
              });
            });
          });

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try{
      if(!req.body.email){
        return res.status(400).json({ error: "Email is required", section: "email" });
      }
      if(!req.body.password){
        return res.status(400).json({ error: "Password is required", section: "password" });
      }
      let email = req.body.email.toLowerCase().trim();
      let user = await UserModel.findOne({email: email});

      if (!user) {
        return res.status(400).json({ error: "User does not exist", section: "email" });
      }

      if (
        !(
          bcrypt.compareSync(req.body.password, user.password)
        )
      ) {
        return res.status(400).json({ error: "Incorrect password", section: "password" });
      }

      const payload = {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        user_level: user.user_level
      };

      const token = Jwt.sign(payload, services.JWT_KEY, {
        expiresIn: 31556926,
      });
      
      return res.status(200).json({
        message: "Login correcto",
        user_level: user.user_level,
        user_name: user.full_name,
        token: token,
      });

    }catch(error){
      console.log(error)
    }
}

export const getUsers = async (req, res) => {
  try {
    let users = await UserModel.find({user_level: "seller"}, {full_name: true});
    return res.status(200).json(users)
  }catch(error){
    console.log(error)
  }
}