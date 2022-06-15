const services = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res, next) {
    res.json({ data: await services.list() });
};

module.exports = {
    list: [asyncErrorBoundary(list)],
  };