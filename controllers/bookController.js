const Center = require('../models/Center');
const Book = require('../models/Book');
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

        book = new Book (
            {
                serviceId: req.body.serviceId,
                userId: req.user.id,
                date: req.body.date, //Toca calcular eso 
                timeApproximate: req.body.timeApproximate,
                timeReal: req.body.timeReal // Se asigna al finalizar el servicio
            });

        await book.save();

        const books = await Book.find({ userId: req.user.id }).sort({ name: -1 });
        res.json({ books });


    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
       
}


exports.index = async (req, res) => {
    try {

        const books = await Book.find({userId: req.user.id}).sort({ name: -1 });
        res.json({ books });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}