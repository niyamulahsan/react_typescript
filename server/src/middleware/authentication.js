const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];
  try {
    if (!token) {
      return res.json({ "msg": "Unauthorized!" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired'
        }
        return res.json({ "msg": err });
      }

      const { id, name, email, role, status, exp } = decoded;
      console.log(decoded);
      req.id = id;
      req.email = email;
      req.name = name;
      req.status = status;
      req.role = role.name;
      req.exp = exp;
      next();
    });
  } catch (err) {
    next("Authentication Failure!");
  }
};

module.exports = authentication;