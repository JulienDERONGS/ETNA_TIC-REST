const database = require('../Database/Database.js');
const helper = require('../Helper/Helper.js');
const _ = require('lodash');
const api = [];

const api_domains = {
    method: 'GET',
    path: '/api/domains.{ext?}',
    handler: (request, h) => {
        console.log("\nRoute : /api/domains.{ext?}");
        console.log(request.params);
        if (!request.params.ext || request.params.ext == "json")
        {
            const db = new database();
            return (db.doQuery("SELECT id, slug, name, description FROM `domain`;"));
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
    path: '/api/domains/{domain}.{ext?}',
    handler: (request, h) => {
        console.log("\nRoute : /api/domains/{domain}.{ext?}");
        console.log(request.params);
        if ((!request.params.ext || request.params.ext == "json") && request.params.domain != "domains")
        {
            const db2 = new database();
            const help = new helper();

            let q1 = "SELECT dl.lang_id AS langs "
            +   "FROM `domain_lang` dl, `domain` d "
            +   "WHERE d.name LIKE '"+ request.params.domain +"'";

            let q2 = "SELECT DISTINCT d.id, d.slug, d.name, d.description, u.id AS `uid`, u.username, d.created_at "
            +   "FROM `domain` d, `user` u, `domain_lang` dl "
            +   "WHERE u.id LIKE d.user_id AND d.id LIKE dl.domain_id AND d.name LIKE '"+ request.params.domain +"'";

            let query_langs = db2.simpleQuery(q1);
            let query_user = db2.simpleQuery(q2);

            // Part 1 : Langs
            query_langs
                .then(function (data)
                {
                    const langs = help.formatLangs(data);
                    this.query_langs = langs;
                    return (langs);
                })
                .catch(function (err)
                {
                    console.log(err);
                    return (err);
                });

            // Part 2 : User
            query_user
                .then(function (data)
                {
                    const user = help.formatUser(data);
                    console.log("\nDEBUG:");
                    console.log(JSON.stringify(user, null, 4));
                    console.log("\n");
                    return (user);
                })
                .catch(function (err)
                {
                    console.log(err);
                    return (err);
                });

            // Part 3 : Merge & return
            _.merge(query_langs, query_user);
            return (query_langs);
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