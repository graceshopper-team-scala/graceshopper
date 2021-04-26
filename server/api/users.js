const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
const Vehicle = require("../db/models/vehicle");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
      where: {
        isAdmin: false
      }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET api/users/orders/admin/:userId
router.get("/orders/admin/:userId", async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const orders = await Order.findAll({
        where: {
          userId: req.params.userId,
        },
        include: [{ model: Vehicle }],
      });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

//GET api/users/orders/:userId
router.get("/orders/:userId", async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const orders = await Order.findOrCreate({
        where: {
          userId: req.params.userId,
          status: 'pending'
        },
        include: [{ model: Vehicle }],
      });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});


//GET api/users/:id

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPK(req.params.id)
    user.destroy()
    res.json(user);
  } catch (err) {
    next(err);
  }
});