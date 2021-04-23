const {
  models: { Order, Vehicle, User },
} = require('../db');

const router = require('express').Router();

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ['id', 'status', 'userId'],
      include: [
        {
          model: Vehicle,
          attributes: ['vehicleName', 'id', 'make', 'model', 'class', 'price'],
          through: {
            attributes: ['quantity'],
          },
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    //   const order = await Order.findByPk(req.params.id);
    const order = await Order.findOne({
      include: [
        {
          model: Vehicle,
          attributes: ['vehicleName', 'id', 'make', 'model', 'class', 'price'],
          through: {
            attributes: ['quantity'],
          },
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//POST /api/orders
//req.body needs to include at least the fields below example:
/*
        {
        "status": "pending",
        "userId": 2,
        "vehicles": [{
            "id": 2,
            "quantity": 3
        }]
    }
    */
router.post('/', async (req, res, next) => {
  try {
    //create new order
    const newOrder = await Order.create(req.body);
    //associate user to order
    const user = await User.findByPk(newOrder.userId);
    await user.addOrder(newOrder);
    //associate order to vehicles
    //pull vehicles in order from req.body
    const newVehicles = req.body.vehicles;
    //map through vehicles and associate each with order in the database
    newVehicles.map(async (vehicle) => {
      const quantity = vehicle.quantity;
      const addVehicle = await Vehicle.findByPk(vehicle.id);
      await newOrder.addVehicle(addVehicle, { through: { quantity } });
    });

    res.status(201).send(newOrder);
  } catch (error) {
    next(error);
  }
});

//PUT /api/orders/add_vehicle
//adds vehicle to cart/order
/*
  Example of required data:
  {
    “orderId”: 3,
    “vehicleId”: 1,
    “quantity”: 3
}
*/

// DELETE /api/orders/id
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
