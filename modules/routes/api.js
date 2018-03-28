const database = require('../Database/Database');
const _ = require('lodash');
const api = [];

const api_domains = {
    method: 'GET',
    path: '/api/domains.{ext}',
    handler: (request, h) => {
        console.log(request.params);
        if (request.params.ext == "json")
        {
            const db = new database();
            return (db.query("SELECT id, slug, name, description FROM `domain`;"));
        }
        else
        {
            var data =
            {
                "code": 400,
                "message": "error",
                "datas": []
            }
            return (h.response(data).code(400));
        }
    }
}

const api_domains_sel = {
    method: 'GET',
    path: '/api/domains/{domain}.{ext}',
    handler: (request, h) => {
        console.log(request.params);
        if (request.params.ext == "json" && request.params.domain != "domains")
        {
            const db2 = new database();
            let q1 = "SELECT lang_id AS langs FROM domain_lang;";
            let q2 = "SELECT id, slug, name, description FROM domain WHERE name = '"+ request.params.domain+"';";
            let q3 = "SELECT u.id, u.username FROM `user` AS u, `domain` AS d WHERE d.name = '"+ request.params.domain +"';";
            let q4 = "SELECT created_at FROM `domain` WHERE name = '"+ request.params.domain +"'";
            q = "SELECT lang_id AS langs FROM domain_lang GROUP BY langs";

            let result = db2.queries(q);
            result.then(function (res) {
                res = _.groupBy(res, res.datas.langs);
                console.log(res);
            }).catch(function (r) {
                console.log(r);
            });
            return (result);
            return (db2.queries(q1, q2, q3, q4));
        }
        else
        {
            var data =
            {
                "code": 400,
                "message": "error",
                "datas": []
            }
            return (h.response(data).code(400));
        }
    }
}

api.push(api_domains, api_domains_sel);
module.exports = api;