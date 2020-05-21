const Center = require('../models/Center');
const Reservation = require('../models/Reservation');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });

const State = {
    RESERVED: 'Reservado',
    ATTENDING: 'Atendiendo',
    ATTENDED: 'Atendido'
}

exports.create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        reservation = new Reservation(
            {
                service: req.body.serviceId,
                user: req.user.id,
                timeEstimatedStart: req.body.timeEstimatedStart,
                timeEstimatedFinish: req.body.timeEstimatedFinish,
                type: 'Turn',
                state: State.RESERVED
            });

        await reservation.save();

        const reservations = await Reservation.find({ user: req.user.id }).sort({ timeEstimatedFinish: 1 });
        res.json({ reservations });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}

exports.index = async (req, res) => {
    try {
            if(req.query.centerId){
                Reservation.find()
                .populate({
                    path: 'user service',
                    populate: {
                        path: 'center',
                        model: 'Center'
                    }
                })
                .exec(function (err, completeReservations) {
                    let reservations = completeReservations.filter(
                        reservation => reservation.service.center._id == req.query.centerId);
                    res.json({ reservations });
                });
            }
            else{
                Reservation.find({ user: req.user.id })
                .sort({ timeEstimatedFinish: 1 })
                .populate({
                    path: 'service',
                    populate: {
                        path: 'center',
                        model: 'Center'
                    }
                })
                .exec(function (err, reservations) {
                    res.json({ reservations });
                })
    
            }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.update = function (req, res, next) {

    Reservation.findByIdAndUpdate(req.params.id, { $set: req.body }, function (error, reservation) {
        if (error)
            return next(error);
        res.json(reservation)
    });
}

exports.delete = function (req, res, next){
   
    Reservation.findByIdAndRemove(req.params.id ,function(error, reservation){
        if(error)
            return next(error);
        res.send("Reservation Removed Succesfully")
    });
}