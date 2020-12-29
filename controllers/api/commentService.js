const { ObjectID } = require('mongodb');
const pageService = require('../../models/commentModel');

exports.CurPage = async (req, res, next) => {
    res.json(await pageService.listComment(ObjectID(req.query.id), req.query.currentPage));
}