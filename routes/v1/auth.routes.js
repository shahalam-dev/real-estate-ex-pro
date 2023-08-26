const express = require("express");
const router = express.Router();

const waterController = require("../controllers").water;

const middlewares = require("../middlewares");

/*
 * @desc /auth
 */
router.post("/track-water", middlewares.isLogged, waterController.create);

router.patch("/track-water", middlewares.isLogged, waterController.update);

router.get("/track-water", middlewares.isLogged, waterController.get);

module.exports = router;
