const mysql = require('mysql');

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
      database : 'etna_crowding'
    });
    console.log("Connected to the database !");
    return (pool);
  };

  query(db_query)
  {
    const self = this;
    var juju = 42
    return new Promise((resolve, reject) => {
      console.log(juju)
      self.getInstance().query(db_query, function(err, h) {
        console.log("Query done !");
        (err) ? reject({ code: 400, message: "error", datas: []}) : resolve({ code: 200, message: "success", datas: h });
      });
    });
  }
}

module.exports = Database;