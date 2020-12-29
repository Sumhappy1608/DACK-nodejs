const express = require('express');
const router = express.Router();

const commentController = require("../../controllers/api/commentService");

router.get('/change-page', commentController.CurPage)

module.exports = router;