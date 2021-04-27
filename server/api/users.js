const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
const Vehicle = require("../db/models/vehicle");
const { requireAdminToken, requireToken } = require("../gatekeeping");
module.exports = router;

router.get("/", requireAdminToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
      include: Order,
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
      include: [
        {
          model: Order,
          attributes: ["id", "status"],
          include: [
            {
              model: Vehicle,
            },
          ],
        },
      ],
      where: {
        isAdmin: false,
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET api/users/orders/
router.get("/orders", requireToken, async (req, res, next) => {
  try {
    // req.user.id must equal req.params.id
    // dont need params
    const orders = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: "pending",
      },
      include: [{ model: Vehicle }],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

//GET api/users/orders/history/
router.get("/orders/history/", requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "userId"],
      where: {
        userId: req.user.id,
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

// DELETE /api/users/:userId
router.delete("/:id", requireAdminToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
