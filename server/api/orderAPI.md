The below is a summary of the routes in our order API.

---
**List of all available routes**: 

- GET /api/orders
- GET /api/orders/:id
- POST /api/orders
- PUT /api/orders/add_vehicle
- PUT /api/orders/remove_vehicle
- PUT /api/:orderId/complete
- DELETE /api/orders/:id
---
**Details for each route**: 

GET /api/orders
- to be used for admin purposes
- retrieves all orders fromo database

GET /api/orders/:id
- retrieves an order by its id


POST /api/orders
- creates a new order
- req.body needs to include at least the fields below example:
    - {
        "userId": 2,
        "vehicles": [{
            "id": 2,
            "quantity": 3
        }]
    }

PUT /api/orders/add_vehicle
- adds vehicle to cart/order; 
    - can add a brand new vehicle to cart; or 
    - if vehicle is already existing then it can update the new quantity (i.e. increment)
- Example of required data:
    - {
    "orderId": 3,
    "vehicleId": 1,
    "quantity": 3
    }


PUT /api/orders/remove_vehicle
- remove vehicle from order
- Example of required data, below. 
    - {
    "orderId": 3,
    "vehicleId": 1,
    "quantity":  2
    }
  
  ****
  - If quantity is provided, quantity will be updated.
  - If no quantity is provided, the vehicle is completely removed from the order/cart.
  - If quantity === 0, the vehicle will also be removed from order/cart
  ****

PUT /api/:orderId/complete
- updates status of order to 'completed'

DELETE /api/orders/:id
- deletes order entirely

