const express = require("express");
const validate = require("express-validation");
const handle = require("express-async-handler");

const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");

const controllers = require("./app/controllers");
const validator = require("./app/validators");

routes.post(
	"/users",
	validate(validator.User),
	handle(controllers.UserController.store)
);
routes.post(
	"/sessions",
	validate(validator.Session),
	handle(controllers.SessionController.store)
);

routes.use(authMiddleware);

routes.get("/ads", handle(controllers.AdController.index));
routes.get("/ads/:id", handle(controllers.AdController.show));
routes.post(
	"/ads",
	validate(validator.Ad),
	handle(controllers.AdController.store)
);
routes.put(
	"/ads/:id",
	validate(validator.Ad),
	handle(controllers.AdController.update)
);
routes.delete("/ads/:id", handle(controllers.AdController.destroy));

routes.post(
	"/purchases",
	validate(validator.Purchase),
	handle(controllers.PurchaseController.store)
);

routes.put("/purchases/:id", handle(controllers.PurchaseController.update));

module.exports = routes;
