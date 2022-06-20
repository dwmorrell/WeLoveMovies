const services = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Lists all theaters and movies showing at those theaters
const list = async (req, res, next) => {
    res.json({ data: await services.list() });
};

module.exports = {
    list: [asyncErrorBoundary(list)],
  };