const User = require('../models/User');
const Center = require('../models/Center');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

exports.create = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;


    try{

        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ message: 'El usuario ya se encuentra registrado'});
        }
        user = await Center.findOne({email})
        if(user){
            return res.status(400).json({ message: 'El usuario ya se encuentra registrado como centro de belleza'});
        }

        
        user = new User (
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cellphone: req.body.cellphone,
                role: 'user'
            }
        )

        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({token})

        });


    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
       
}

/*exports.details = function (req, res, next){
   
    User.findById(req.params.id, function(error, user){
        if(error)
            return next(error);
        res.send(user)
    });
}

exports.update = function (req, res, next){
   
    User.findByIdAndUpdate(req.params.id, { $set: req.body} ,function(error, user){
        if(error)
            return next(error);
        res.send("User Update Succesfully")
    });
}

exports.delete = function (req, res, next){
   
    User.findByIdAndRemove(req.params.id ,function(error, user){
        if(error)
            return next(error);
        res.send("User Removed Succesfully")
    });
}

exports.index = function (req, res, next){
   
    User.find({} ,function(error, users){
        if(error)
            return next(error);
        res.send(users)
    });
} */