const Center = require('../models/Center');
const Service = require('../models/Service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

exports.create = async (req, res) => {


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

        const services = await Service.find({centerId: req.query.centerId}).sort({ name: -1 });
        res.json({ services });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.delete = function (req, res, next){
   
    Service.findByIdAndRemove(req.params.id ,function(error, service){
        if(error)
            return next(error);
        res.send("Service Removed Succesfully")
    });
}

exports.update = function (req, res, next){
   console.log(req.params.id)
   console.log(req.body)
    Service.findByIdAndUpdate(req.params.id, { $set: req.body} ,function(error, service){
        if(error)
            return next(error);
        res.json(service)
    });
}

exports.details = function (req, res, next){
   
    Service.findById(req.params.id, function(error, user){
        if(error)
            return next(error);
        res.send(user)
    });
}

/*exports.update = async (req, res ) => {
    try {

        let service = await Service.findById(req.params.id);

        if(!service) {
            return res.status(404).json({msg: 'No existe ese servicio'});
        }

        // Guardar la tarea
        service = await Service.findOneAndUpdate({_id : req.params.id }, req.params, { new: true } );

        res.json({ service });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}*/