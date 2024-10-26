const { check } = require("express-validator");
const User = require("../../models/userSchema");

const auth = {};

auth.storeschema = [
  check("name").optional({ nullable: true }),
  check("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid email"),
  check("password").notEmpty().withMessage("Password is required"),
  check("confirm_password").notEmpty().withMessage("Confirm Password required").bail().custom((value, { req, res }) => {
    if (req.body.password !== value) {
      return Promise.reject();
    }
    return Promise.resolve();
  }).withMessage("Password not matched!"),
];

auth.forgetschema = [
  check("email").notEmpty().withMessage("Email required").bail().isEmail().withMessage("Invalid format").bail().custom(async (value, { req, res }) => {
    const user = await User.findOne({ email: value });
    if (!user) {
      return Promise.reject("Email not found");
    }

    return Promise.resolve();
  })
];

auth.resetschema = [
  check("password").notEmpty().withMessage("Password required"),
  check("confirm_password").notEmpty().withMessage("Confirm Password required").bail().custom((value, { req, res }) => {
    console.log(req.body.password, value);
    if (req.body.password !== value) {
      return Promise.reject("Password not matched!");
    }

    return Promise.resolve();
  })
];

module.exports = auth;