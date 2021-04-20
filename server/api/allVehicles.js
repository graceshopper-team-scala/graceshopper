const { Vehicle } = require('../db');

const router = require('express').Router();

// GET /api/vehicles
router.get('/', async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});
