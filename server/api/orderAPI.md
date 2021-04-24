The below is a summary of the routes in our order API.

---
**List of all available routes**: 

- GET /api/orders
- GET /api/orders/:id
- PUT /api/orders/add_vehicle
- PUT /api/orders/remove_vehicle
- PUT /api/:orderId/complete
- DELETE /api/orders/:id
---
**Details for each route**: 

GET /api/orders
- to be used for admin purposes
- retrieves all orders from database

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
- sends back the new order (data structure: object)

PUT /api/orders/add_vehicle
- adds vehicle to cart/order; 
    - if user does not have a car: route will create a new cart with the vehicle you 'added to cart'
    - can add a brand new vehicle to cart; or 
    - if vehicle is already existing then it can update the new quantity (i.e. increment)
    - if request to add vehicle is coming from the CART, include key "fromCart" and set to true
        - the logic is different depending on whether you're adding from the single vehicle view or 
        if you're adding from the cart page
- Example of required data:
    - {
    "userId": 2,
    "vehicleId": 1,
    "quantity": 3,
    "fromCart": true
    }
- sends back an array of the new vehicles

PUT /api/orders/remove_vehicle
- remove vehicle from order
- Example of required data, below. 
    - {
    "orderId": 3,
    "vehicleId": 1,
    "quantity":  2
    }
  
  ****
  - If quantity is provided, quantity will be updated (i.e. decremented).
  - If no quantity is provided, the vehicle is completely removed from the order.
  - If quantity === 0, the vehicle will also be removed from the order.
  ****

  - sends back an array of the new vehicles


PUT /api/:orderId/complete
- updates status of order to 'completed'
- sends back an array of the new vehicles

DELETE /api/orders/:id
- deletes order entirely
- sends back the order

