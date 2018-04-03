const _ = require('lodash');

class Helper
{
    constructor() {}

    fuseSameKeys(data, key)
    {
        const langs = _.map(data.datas, key);
        const result = [];
        result["langs"] = langs;
        return (result);
    }

    formatLangs(data)
    {
        if (!data)
        {
            return (data);
        }
        const format = this.fuseSameKeys(data, "langs");
        JSON.parse(JSON.stringify(format, null, 4));
        console.log(format);
        return (format);
    }

    formatUser(data)
    {
        if (!data)
        {
            return (data);
        }
        const format = {
            "id": data.datas[0].id,
            "slug": data.datas[0].slug,
            "name": data.datas[0].name,
            "description": data.datas[0].description,
            "creator":
            {
                "id": data.datas[0].uid,
                "username": data.datas[0].username
            },
            "created_at": data.datas[0].created_at
        };
        JSON.parse(JSON.stringify(format, null, 4));
        return (format);
    }
}

module.exports = Helper;