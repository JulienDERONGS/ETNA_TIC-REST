const database = require('../Database/Database');
const errors = [];

const error404 = {
    method: '*',
    path: '/{p*}',
    handler: (request, h) => {
        console.log(request.params);
        var data =
        {
            "code": 404,
            "message": "not found"
        }
        return (h.response(data).code(404));
        }
}

errors.push(error404);
module.exports = errors;