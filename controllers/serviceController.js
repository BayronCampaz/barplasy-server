const Center = require('../models/Center');
const Service = require('../models/Service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

exports.create = async (req, res) => {

    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try{

        service = new Service (
            {
                centerId: req.user.id,
                type: req.body.type,
                name: req.body.name,
                description: req.body.description,
                time: req.body.time,
                price: req.body.price,
            });

        await service.save();

        const services = await Service.find({ centerId: req.user.id }).sort({ name: -1 });
        res.json({ services });


    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
       
}


exports.index = async (req, res) => {
    try {
        const services = await Service.find({ centerId: req.user.id }).sort({ name: -1 });
        res.json({ services });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}