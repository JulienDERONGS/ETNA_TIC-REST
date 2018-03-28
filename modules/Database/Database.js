const mysql = require('mysql');
var flag = true;

class Database
{
  constructor() {}
  
  getInstance() {
    if (pool)
    {
      return (pool);
    }

    var pool = mysql.createPool({
      host     : 'localhost',
      user     : 'root',
      password : 'etnaetna',
      database : 'etna_crowding',
      multipleStatements: true
    });
    console.log("Connected to the database !");
    return (pool);
  };

  /* query(db_query, first = true)
  {
    const self = this;
    return new Promise((resolve, reject) => {
      self.getInstance().query(db_query, function(err, h) {
        console.log("Query done !" + err);
        if (first == true)
        {
          if (err)
          {
            reject({ code: 400, message: "error", datas: []});
          }
          else
          {
            resolve({ code: 200, message: "success", datas: JSON.parse(JSON.stringify(h))});
          }
        }
        else
        {
          if (err)
          {
            reject({ code: 400, message: "error", datas: []});
          }
          else
          {
            resolve({ code: 200, message: "success", datas: h });
          }
        }
      });
    });
  } */

  /*queriesBACKUP(...q)
  {
    const self = this;
    const result = q.map(one => {
      if (flag)
        {
          flag = false;
          return self.query(one, true)
        }
        self.query(one, false);
      });
    flag = true;
    return Promise.all(result);
  }*/

  queries(q)
  {
    const self = this;
    return new Promise((resolve, reject) => {
      self.getInstance().query(q, function(err, h) {
        console.log(err ? "Query error : " + err : "Query done ! ");
        if (err)
        {
          reject({
            code: 400,
            message: "error",
            datas: []});
        }
        else
        {
          resolve({
            h
          });
        }
      })
    });
  }
}
module.exports = Database;