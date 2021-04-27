const {
  models: { User },
} = require("./db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
const requireAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.isAdmin) {
      req.user = user;
    } else {
      throw "Invalid request, unauthorized user!";
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
  requireAdminToken,
};
