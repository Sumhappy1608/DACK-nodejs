const express = require('express');
const router = express.Router();

const userController = require("../../controllers/api/userController");

router.get('/is-exist', userController.isExist);

module.exports = router;