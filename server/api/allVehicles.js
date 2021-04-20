const {
  models: { Vehicle },
} = require('../db');

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

// GET /api/vehicles/:id
router.get('/:id', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
