const Info = require("../../models/infoSchema");

const info = {};

info.index = async (req, res, next) => {
  try {
    let search = req.query.search || "";
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = limit * (page - 1);

    const countInfoData = await Info.find().or({ name: { $regex: `.*${search}.*`, $options: 'i' } }).countDocuments();

    let pages = Math.ceil(countInfoData / limit);
    let total = countInfoData;

    let query = Info.find()
      .or([
        { name: { $regex: `.*${search}.*`, $options: 'i' } },
        { email: { $regex: `.*${search}.*`, $options: 'i' } },
        { mobile: { $regex: `.*${search}.*`, $options: 'i' } }
      ])
      .limit(limit)
      .skip(skip)
      .sort({ updatedAt: -1 });

    const infoData = await query.exec(); // after all query generate then use await here

    return res.status(200).json({
      current_page: Number(page),
      per_page: Number(limit),
      total: Number(total),
      from: infoData.length > 0 ? Number(skip + 1) : null,
      to: infoData.length > 0 ? Number(skip + infoData.length) : null,
      last_page: Number(pages),
      search: search,
      result: infoData
    });
  } catch (err) {
    next(err);
  }
};

info.store = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile
    };
    await Info.create(data);

    return res.json({ msg: "Info created successfully" });
  } catch (err) {
    next(err);
  }
};

info.show = async (req, res, next) => {
  try {
    const info = await Info.findOne({ _id: req.params.id });

    return res.json({ info: info });
  } catch (err) {
    next(err);
  }
};

info.update = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile
    };

    await Info.updateOne({ _id: req.params.id }, { $set: data });

    return res.json({ msg: "Info updated successfully" });
  } catch (err) {
    next(err);
  }
};

info.delete = async (req, res, next) => {
  try {
    const idsToDelete = req.params.id.split(",");
    await Info.deleteMany({ _id: { $in: idsToDelete } });
    return res.json({ msg: "Info deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = info;
