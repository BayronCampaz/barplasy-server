const Center = require('../models/Center');
const Reservation = require('../models/Reservation');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

const State = {
    RESERVED : 'Reservado',
    ATTENDING : 'Atendiendo',
    ATTENDED : 'Atendido'
}

exports.create = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try{

        reservation = new Reservation (
            {
                serviceId: req.body.serviceId,
                userId: req.user.id,
                timeEstimatedStart: req.body.timeEstimatedStart,
                timeEstimatedFinish : req.body.timeEstimatedFinish,
                type: 'Turn',
                state: State.RESERVED
            });

        await reservation.save();

        const reservations = await Reservation.find({ userId: req.user.id }).sort({ timeEstimatedFinish: -1 });
        res.json({ reservations });


    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
       
}


exports.index = async (req, res) => {
    try {
        const reservations = await Reservation.find({userId: req.user.id}).sort({ timeEstimatedFinish: -1 });
        res.json({ reservations });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.update = function (req, res, next){

     Reservation.findByIdAndUpdate(req.params.id, { $set: req.body} ,function(error, reservation){
         if(error)
             return next(error);
         res.json(reservation)
     });
 }