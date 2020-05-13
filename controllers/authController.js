const User = require('../models/User');
const Center = require('../models/Center');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

exports.authenticateUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password, role} = req.body;

    try{
        let user = ''

        if(role === 'user'){
            user = await User.findOne({email})
        }else if(role === 'center'){
            user = await Center.findOne({email})
        }

        if(!user) {
            return res.status(400).json({ message: 'El usuario no se encuentra registrado'});
        }

        const correctPassword = await bcryptjs.compare(password, user.password);
        if(!correctPassword){
            return res.status(400).json({message: 'Contraseña incorrecta'})
        }

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
    }
}

exports.userAuthenticated = async (req, res) => {
    try {
        let user = '';
             user = await User.findById(req.user.id).select('-password');
        if(!user){
             user = await Center.findById(req.user.id).select('-password');
        }

        res.json({user})

    }catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'});
    }
}
