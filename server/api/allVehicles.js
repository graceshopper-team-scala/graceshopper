const { Vehicle } = require('../db');

const router = require('express').Router();

// GET /api/vehicles
router.get('/', async (req, res, next) => {
    try {
      const cars = await Car.findAll();
      res.json(cars);
    } catch (error) {
      next(error);
    }
  });