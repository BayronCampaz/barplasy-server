const User = require('../models/User');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

exports.authenticateUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({ message: 'El usuario no existe'});
        }

        const correctPassword = await bcryptjs.compare(password, user.password);
        if(!correctPassword){
            return res.status(400).json({message: 'Password Incorrecto'})
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
