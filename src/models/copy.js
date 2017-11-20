const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
  ssl: true,
});

function queryByCopynumber (copyNumber, callback) {
  client.connect();
  client.query(`SELECT * FROM copy WHERE copyNumber = '${ copyNumber }'`, (err, res) => {
    if (err) {
      console.log(err)
      callback({})
    } else {
      callback(res.rows[0])
    }
    client.end();
  });
}

function queryByBooknumber (bookNumber, callback) {
  client.connect();
  client.query(`SELECT * FROM copy WHERE bookNumber = '${ bookNumber }'`, (err, res) => {
    if (err) {
      console.log(err)
      callback({})
    } else {
      callback(res.rows)
    }
    client.end();
  });
}

function queryAll (callback) {
  client.connect();
  client.query(`SELECT * FROM copy`, (err, res) => {
    if (err) {
      console.log(err)
      callback({})
    } else {
      callback(res.rows)
    }
    client.end();
  });
}

module.exports = {
  queryByCopynumber,
  queryAll,
  queryByBooknumber
}