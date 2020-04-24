const LifeGuard = require("../models/lifeGuard");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.getLifeGuards = async (req, res, next) => {
  LifeGuard.find({})
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

exports.getLifeGuard = async (req, res, next) => {
  const { lifeGuardId } = req.params;
  LifeGuard.find({ _id: new ObjectId(lifeGuardId) })
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};
