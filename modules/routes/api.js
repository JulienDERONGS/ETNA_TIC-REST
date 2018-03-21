const db = require('../Database/Database');
const api = []

const api_domains = {
    method: 'GET',
    path: '/api/domains.{ext}',
    handler: (request, h) => {
        if (request.params.ext == "json")
        {
            const dbInstance = new db();
            return dbInstance.query("SELECT id, slug, name, description FROM `domain`;")
        }
        else
        {
            var data =
            {
                "code": 400,
                "message": "error",
                "datas": []
            }
            return (data);
        }
    }
}

api.push(api_domains);
module.exports = api;