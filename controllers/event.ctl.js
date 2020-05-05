const Event = require("../models/event");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.getEventsByBeach = async (req, res, next) => {
  const { beachId } = req.params;
  Event.find({ beachId: new ObjectId(beachId) })
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

exports.addEventNote = async (req, res, next) => {
  const { eventId, note } = req.body;
  Event.findOneAndUpdate({ _id: new ObjectId(eventId) }, { note: note })
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

exports.removeEvent = async (req, res, next) => {
  const { eventId } = req.params;
  Event.deleteOne({ _id: new ObjectId(eventId) })
    .then(response => {
      return res.status(200).send(response);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};
