var mysql = require('mysql');

var con = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "etnaetna"
  });

con.connect(function (err)
{
  if (err)
  {
    throw err;
  }
  console.log("Connected !");
  con.query("SELECT * FROM etna_crowding", function (err, result) {
    if (err)
    {
      throw err;
    }
    console.log("SELECT done");
  });
});