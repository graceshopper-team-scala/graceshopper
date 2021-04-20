const router = require('express').Router();
// const Car = require('../db/car);

router.get('/:id', async (req, res) => {
  try {
    const car = await CaretPosition.findByPk(req.params.id);
    res.json(car);
  } catch (error) {
    console.error(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
