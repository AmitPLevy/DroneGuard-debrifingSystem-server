const LifeGuard = require("../models/lifeGuard");

exports.getLifeGuards = async (req, res, next) => {
  LifeGuard.find({})
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};
