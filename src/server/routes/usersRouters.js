const express = require("express");
const peopleController = require("../controllers/peopleController");
const { login, register } = require("../controllers/userControllers");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/main-page", peopleController);

module.exports = router;
