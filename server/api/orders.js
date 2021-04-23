const {
<<<<<<< HEAD
  models: { Order, Vehicle, User, Order_Vehicle },
} = require('../db');

const router = require('express').Router();

=======
    models: { Order, Vehicle, User, Order_Vehicle},
  } = require('../db');

  const router = require('express').Router();


>>>>>>> 73287da6a22904fad5b339cfa0553122752dc96e
//GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
<<<<<<< HEAD
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
=======
        attributes: ['id', 'status', 'userId'],
        include: [
            {
                model: Vehicle,
                attributes: ['vehicleName', 'id', 'make',
                        'model', 'class', 'price'],
                through: {
                attributes:['quantity']
        }
            }
        ],
>>>>>>> 73287da6a22904fad5b339cfa0553122752dc96e
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

//GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      include: [
        {
<<<<<<< HEAD
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
    res.send(order);
  } catch (error) {
    next(error);
  }
});
=======
            include: [
                {
                    model: Vehicle,
                    attributes: ['vehicleName', 'id', 'make',
                            'model', 'class', 'price'],
                    through: {
                    attributes:['quantity']
            }
                }
            ],
            where: {
                id: req.params.id
            },
        }
    )
      res.send(order);
    } catch (error) {
      next(error);
    }
  });


>>>>>>> 73287da6a22904fad5b339cfa0553122752dc96e

//POST /api/orders
//req.body needs to include at least the fields below example:
/*
        {
        "userId": 2,
        "vehicles": [{
            "id": 2,
            "quantity": 3
        }]
    }
    */
router.post('/', async (req, res, next) => {
<<<<<<< HEAD
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
=======
    try {

        //create new order
        const newOrder = await Order.create(req.body)
        //associate user to order
        const user = await User.findByPk(newOrder.userId)
        await user.addOrder(newOrder)
        //associate order to vehicles
        //pull vehicles in order from req.body
        const newVehicles = req.body.vehicles
        //map through vehicles and associate each with order in the database

        newVehicles.map(async vehicle => {
                const quantity = vehicle.quantity
                const addVehicle = await Vehicle.findByPk(vehicle.id)
                await newOrder.addVehicle(addVehicle,
                            {through: {quantity}})
        })

      res.send(newOrder);
    } catch (error) {
      next(error);
    }
  });
>>>>>>> 73287da6a22904fad5b339cfa0553122752dc96e

    res.send(newOrder);
  } catch (error) {
    next(error);
  }
});

//PUT /api/orders/add_vehicle
//adds vehicle to cart/order; this includes updating quantity of a vehicle in an order
/*
  Example of required data:
  {
    "orderId": 3,
    "vehicleId": 1,
    "quantity": 3
}
*/
router.put('/add_vehicle', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);
    const vehicle = await Vehicle.findByPk(req.body.vehicleId);
    const quantity = req.body.quantity;
    const alreadyInCart = await order.hasVehicle(vehicle);
    if (!alreadyInCart) {
      await order.addVehicle(vehicle, { through: { quantity } });
      res.send(await order.getVehicles());
    } else {
      const quantityToUpdate = await Order_Vehicle.findOne({
        where: {
          orderId: order.id,
          vehicleId: vehicle.id,
        },
      });
      if (quantityToUpdate.quantity < quantity) {
        await order.addVehicle(vehicle, { through: { quantity } });
        res.send(await order.getVehicles());
      } else {
        res.send('Cannot decrement on this put route');
      }
    }
<<<<<<< HEAD
  } catch (error) {
    next(error);
  }
});
=======

} catch (error) {
  next(error);
}
})

>>>>>>> 73287da6a22904fad5b339cfa0553122752dc96e

//PUT /api/orders/remove_vehicle
//remove vehicle from cart/order
/*
  Example of required data, below.

  ****
  If quantity is provided, quantity will be updated.
  If no quantity is provided, the vehicle is completely removed from the order/cart.
  If quantity === 0, the vehicle will also be removed from order/cart
  ****

  {
    "orderId": 3,
    "vehicleId": 1,
    "quantity":  2
  }
*/
router.put('/remove_vehicle', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId);

    const vehicle = await Vehicle.findByPk(req.body.vehicleId);

    if (!req.body.quantity || req.body.quantity === 0) {
      await order.removeVehicle(vehicle);
      res.send('Vehicle removed from order');
    } else {
      const quantityToUpdate = await Order_Vehicle.findOne({
<<<<<<< HEAD
        where: {
          orderId: order.id,
          vehicleId: vehicle.id,
        },
      });
      if (quantityToUpdate.quantity > req.body.quantity) {
        await quantityToUpdate.update({ quantity: req.body.quantity });
        res.send(await order.getVehicles());
      } else {
        res.send('Cannot increment on this put route');
      }
=======
            where: {
              orderId: order.id,
              vehicleId: vehicle.id
              }
            })
        if(quantityToUpdate.quantity>req.body.quantity){
            await quantityToUpdate.update({quantity:req.body.quantity})
          res.send(await order.getVehicles())
        }
        else{
          res.send("Cannot increment on this put route")
        }
>>>>>>> 73287da6a22904fad5b339cfa0553122752dc96e
    }
  } catch (error) {
    next(error);
  }
});

//PUT /api/:orderId/complete
//updates status of order to 'completed'
router.put('/:orderId/complete', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    await order.update({ status: 'completed' });
    res.send(await order.getVehicles());
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orders/:id
router.delete('/:id', async (req, res, next) => {
<<<<<<< HEAD
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
=======
    try {
      const order = await Order.findByPk(req.params.id);
      await order.destroy();
      res.send(order);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;
>>>>>>> 73287da6a22904fad5b339cfa0553122752dc96e
