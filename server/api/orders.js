const {
    models: { Order, Vehicle, User, Order_Vehicle},
  } = require('../db');
  
  const router = require('express').Router();

  
//GET /api/orders
  router.get('/', async (req, res, next) => {
    try {
    const orders = await Order.findAll({
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
    });
        res.json(orders);
    } catch (error) {
        next(error);
    }
});
  
//GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
    try {
    const order = await Order.findOne(
        {
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


//PUT /api/orders/add_vehicle
//adds vehicle to cart/order; this includes updating quantity of a vehicle in an order
/*
  Example of required data:
  {
    "userId": 1
    "orderId": 3,
    "vehicleId": 1,
    "quantity": 3
}
*/
router.put('/add_vehicle', async (req, res, next) => {
  try {
    //if this is a new order: creates new order upon vehicle being added to cart
    const user = await User.findByPk(req.body.userId)
    const pendingOrder = await user.countOrders()
   
    if (pendingOrder===0) {
      const newOrder = await Order.create({
        userId: req.body.userId 
      })
      const addVehicle = await Vehicle.findByPk(req.body.vehicleId)
        await newOrder.addVehicle(addVehicle, {through: {quantity:req.body.vehicleId}})
        res.send(await newOrder.getVehicles())
    }

    //else, see if vehicle is already in cart. if so, increment. if not, add new row to cart
    else {
        const order = await user.getOrders()
        // const order = await Order.findByPk(req.body.orderId)
        const vehicle = await Vehicle.findByPk(req.body.vehicleId)
        const quantity = req.body.quantity
        const alreadyInCart = await order[0].hasVehicle(vehicle)

        if(!alreadyInCart){
          await order[0].addVehicle(vehicle, {through: {quantity}})
          res.send(await order[0].getVehicles())
        }
        else{
          const quantityToUpdate = await Order_Vehicle.findOne({
              where: {
                orderId: order[0].id,
                vehicleId: vehicle.id
              }
            })
            await quantityToUpdate.update({quantity: quantityToUpdate.quantity + quantity})
            res.send(await order[0].getVehicles())
            // if(quantityToUpdate.quantity<quantity) {
            //   await order.addVehicle(vehicle, {through: {quantity}})
            //   res.send(await order.getVehicles())
            // }
          
            // else{
            //   res.send("Cannot decrement on this put route")
            // }
        }
    }
      
    
} catch (error) {
  next(error);
}
})


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
    const order = await Order.findByPk(req.body.orderId)

    const vehicle = await Vehicle.findByPk(req.body.vehicleId)

    if(!req.body.quantity || req.body.quantity===0) {
      await order.removeVehicle(vehicle)
      res.send("Vehicle removed from order")
    }
    else
    {
      const quantityToUpdate = await Order_Vehicle.findOne({
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
    }
} catch (error) {
  next(error);
}
})

//PUT /api/:orderId/complete
//updates status of order to 'completed'
router.put('/:orderId/complete', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    await order.update({status:'completed'})
    res.send(await order.getVehicles())
} catch (error) {
  next(error);
}
})

// DELETE /api/orders/:id
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
  