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
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET api/users/admin
router.get("/admin", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
      include: [{
        model: Order,
        attributes: ['id', 'status'],
        include: [{
          model: Vehicle
        }]
      }],
      where: {
        isAdmin: false
      }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET api/users/orders/:userId
router.get("/orders/:userId", async (req, res, next) => {
  try {
    const orders = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: "pending",
      },
      include: [{ model: Vehicle }],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

//GET api/users/orders/:userId
router.get("/orders/history/:userId", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "userId"],
      where: {
        userId: req.params.userId,
        status: "completed",
      },
      include: [
        {
          model: Vehicle,
          through: { attributes: ["quantity"] },
          attributes: ["id", "make", "model", "price", "imageUrl"],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});