const index_route = require("./api.js");
const api_route = require("./index.js");
const errors_route = require("./errors.js");

const getRoutes = function () {
    let res = [];

    for (const one of arguments)
    {
        res = res.concat(one);
    }
    return res;
}

const all_routes = getRoutes(index_route, api_route, errors_route);
module.exports = all_routes;