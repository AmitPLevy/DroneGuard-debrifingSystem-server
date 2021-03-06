const Beach = require("../models/beach");
const Drone = require("../models/drone");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

exports.getBeaches = async (req, res, next) => {
  Beach.find({})
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

//should we add validation?
exports.addBeach = async (req, res, next) => {
  const { name, droneNumber, lifeGuards, image } = req.body;

  Drone.find({ droneNumber })
    .then(async result => {
      if (result.length) {
        return res.status(409).send("Drone number already exist");
      } else {
        const creationResult = await Drone.create({ droneNumber });
        Beach.create({
          name,
          droneId: creationResult._id,
          lifeGuards,
          image
        })
          .then(response => {
            return res.status(200).send(response);
          })
          .catch(error => {
            return res.status(500).send(error);
          });
      }
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

exports.getBeachesByLifeGuard = async (req, res, next) => {
  const { lifeGuardId } = req.params;
  let beaches = [];
  Beach.find({})
    .then(response => {
      response.map(beach => {
        if (beach.lifeGuards.includes(lifeGuardId)) {
          beaches.push(beach);
        }
      });
      return res.status(200).send(beaches);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};
