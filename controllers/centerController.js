const Center = require('../models/Center');
const User = require('../models/User');
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

        let center = await Center.findOne({email})
        if(center){
            return res.status(400).json({ message: 'El centro de belleza ya se encuentra registrado'});
        }
        center = await User.findOne({email})
        if(center){
            return res.status(400).json({ message: 'El correo se encuentra enlazado a un usuario'});
        }

        center = new Center (
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                ownerId: req.body.ownerId,
                ownerName: req.body.ownerName,
                cellphone: req.body.cellphone,
                decimal: 0.0,
                banner: '',
                image:'',
                role:'center',
                location: { 
                    address : 'Cra 33 # 43 - 34', 
                    latitude : -70.555, 
                    longitude : 0.5484  }
            });

        const salt = await bcryptjs.genSalt(10)
        center.password = await bcryptjs.hash(password, salt);

        await center.save();

        const payload = {
            user: {
                id: center.id
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

exports.details = function (req, res, next){
   
    Center.findById(req.params.id, function(error, center){
        if(error)
            return next(error);
        res.send(center)
    });
}


exports.index = async (req, res) => {
    try {
        const centers = await Center.find().sort({ name: -1 });
        res.json({ centers });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}