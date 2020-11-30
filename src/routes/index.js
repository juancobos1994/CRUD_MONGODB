const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

router.get('/', async (req, res) => {
    console.log("Inicio");
    const flights = await Flight.find({"Year":"2005"});
    console.log(flights.length);
    
    res.render('index', {
      flights
    });
});

router.get('/nuevo', (req, res) => {
    res.render('agregar')
});

router.get('/editar/:id', async (req, res, next) => {
  const flight = await Flight.findById(req.params.id);
  console.log(flight)
  res.render('editar', { flight });
});

router.post('/editar/:id', async (req, res, next) => {
  const { id } = req.params;
  await Flight.update({_id: id}, req.body);
  res.redirect('/');
});

router.post('/add', async (req, res, next) => {
    const flight = new Flight(req.body);
    await flight.save();
    res.redirect('/');
});


router.get('/eliminar/:id', async (req, res, next) => {
  let { id } = req.params;
  await Flight.remove({_id: id});
  res.redirect('/');
});

router.get('/ver/:id', async (req, res, next) => {
  const flight = await Flight.findById(req.params.id);
  console.log(flight)
  res.render('ver', { flight });
});


module.exports=router;