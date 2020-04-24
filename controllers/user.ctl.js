const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const LifeGuard = require("../models/lifeGuard");
const Supervisor = require("../models/supervisor");

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
              : await Supervisor.create({ name, image });
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
  const lowerEmail = email.toLowerCase();
  User.find({ email: lowerEmail })
    .then(result => {
      if (!result.length) {
        return res.status(401).send("Username or password is incorrect!");
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
              .then(result => {
                return res.status(200).send({
                  msg: "Logged in!",
                  token,
                  user: result[0]
                });
              })
              .catch(error => {
                return res.status(401).send("Username or password is incorrect!");
              });
          }
        });
      }
    })
    .catch(error => {
      return res.status(400).send(error);
    });
};
