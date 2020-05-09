const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

const Middleware = require("./middleware/validator");
const userCtl = require("./controllers/user.ctl");
const beachCtl = require("./controllers/beach.ctl");
const lifeGuardCtl = require("./controllers/lifeGuard.ctl");
const eventCtl = require("./controllers/event.ctl");

app
  .use(express.json())
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.post("/sign-up", Middleware.validateRegistrationDetails, userCtl.signUp);
app.post("/login", userCtl.login);
app.post("/addBeach", Middleware.validateToken, beachCtl.addBeach);
app.post("/addEventNote", Middleware.validateToken, eventCtl.addEventNote);
app.post("/addEvent", Middleware.validateToken, eventCtl.addEvent);

// each route should include Middleware.validateToken
app.get("/secret-route", Middleware.validateToken, (req, res, next) => {
  res.send("This is the secret content. Only logged in users can see that!");
});
app.get("/beaches", Middleware.validateToken, beachCtl.getBeaches);
app.get("/lifeGuards", Middleware.validateToken, lifeGuardCtl.getLifeGuards);
app.get(
  "/lifeGuard/:lifeGuardId",
  Middleware.validateToken,
  lifeGuardCtl.getLifeGuard
);
app.get(
  "/events/:beachId",
  Middleware.validateToken,
  eventCtl.getEventsByBeach
);
app.get("/users", Middleware.validateToken, userCtl.users);

app.delete(
  "/removeEvent/:eventId",
  Middleware.validateToken,
  eventCtl.removeEvent
);

app.listen(port, () => console.log("server running on port:" + port));
