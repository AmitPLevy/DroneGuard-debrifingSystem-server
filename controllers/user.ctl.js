const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const LifeGuard = require("../models/lifeGuard");
const Admin = require("../models/admin");
const Beach = require("../models/beach");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.users = async (req, res, next) => {
  let users = [];
  User.find({})
    .then(response => {
      Promise.map(response, async user => {
        const userData =
          user.userType === "LifeGuard"
            ? await LifeGuard.find({ _id: user._id })
            : await Admin.find({ _id: user._id });
        const beaches = await Beach.find({
          lifeGuards: { $in: [new ObjectId(user._id)] }
        });
        users.push({ ...user.toObject(), name: userData[0].name, beaches });
      }).then(() => {
        return res.status(200).send(users);
      });
    })

    .catch(error => {
      return res.status(500).send(error);
    });
};

exports.signUp = async (req, res, next) => {
  const { email, password, name, image, userType } = req.body;
  const lowerEmail = email.toLowerCase();
  User.find({ email: lowerEmail }).then(result => {
    if (result.length) {
      return res.status(409).send("Email already in use");
    } else {
      bcrypt.hash(password, 10, async (error, hash) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          let creationResult =
            userType === "LifeGuard"
              ? await LifeGuard.create({ name, image })
              : await Admin.create({ name, image });
          User.create({
            _id: creationResult._id,
            email: lowerEmail,
            password: hash,
            userType
          })
            .then(result => {
              return res.status(201).send("registered");
            })
            .catch(error => {
              return res.status(400).send(error);
            });
        }
      });
    }
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { apptype } = req.headers;
  const lowerEmail = email.toLowerCase();
  User.find({ email: lowerEmail })
    .then(result => {
      if (!result.length) {
        return res.status(401).send("Username or password is incorrect!");
      } else {
        console.log(`user = ${result[0]}`)
        if (apptype === "dashboard" && result[0].userType === "LifeGuard") {
          return res.status(401).send("Missing permissions");
        } else {
          bcrypt.compare(password, result[0]["password"], (bError, bResult) => {
            // wrong password
            if (bError || !bResult) {
              return res.status(401).send("Username or password is incorrect!");
            }
            if (bResult) {
              const token = jwt.sign(
                {
                  email: result[0].email,
                  userId: result[0].id
                },
                "SECRETKEY",
                {
                  expiresIn: "7d"
                }
              );
              User.findOneAndUpdate(
                { email: lowerEmail },
                { lastLogin: Date.now() }
              )
                .then((result) => {
                  console.log(`returning 200. user = ${result}`)
                  return res.status(200).send({
                    msg: "Logged in!",
                    token,
                    user: result
                  });
                })
                .catch(error => {
                  return res
                    .status(401)
                    .send("Username or password is incorrect!");
                });
            }
          });
        }
      }
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};
