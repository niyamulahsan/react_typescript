const { check } = require("express-validator");
const Info = require("../../models/infoSchema");

const info = {};

info.storeschema = [
  check("name").notEmpty().withMessage("Name required").isLength({ max: 20 }).withMessage("Max 20 char"),
  check("email").notEmpty().withMessage("Email required").bail().isEmail().withMessage("Email format is invalid").bail().custom(async (value, { req, res }) => {
    const checkdata = await Info.findOne({ name: { $regex: value, $options: 'i' } });

    if (checkdata) {
      return Promise.reject("Already exists");
    }
    return Promise.resolve();
  }),
  check("mobile").notEmpty().withMessage("Mobile required").isLength({ max: 14 }).withMessage("Max 14 char")
];

info.updatechema = [
  check("name").notEmpty().withMessage("Name required").isLength({ max: 20 }).withMessage("Max 20 char"),
  check("email").notEmpty().withMessage("Email required").bail().isEmail().withMessage("Email format is invalid"),
  check("mobile").notEmpty().withMessage("Mobile required").isLength({ max: 14 }).withMessage("Max 14 char")
];

module.exports = info;
