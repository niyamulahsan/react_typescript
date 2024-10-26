const { Router } = require("express");
const role = require("../modules/role/role.route");
const auth = require("../modules/auth/auth.route");
const user = require("../modules/user/user.route");
const info = require("../modules/info/info.route");

const route = Router()
  .use(role)
  .use(auth)
  .use(user)
  .use(info);

module.exports = route;