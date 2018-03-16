const api = []

const api_domains = {
    method: 'GET',
    path: '/api/domains.{ext}',
    handler: (request, h) => {
        if (request.params.ext == "json")
        {
            return ("SQL Request here.");
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