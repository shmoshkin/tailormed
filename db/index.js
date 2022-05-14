const {Pool} = require('pg');
const format = require('pg-format');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})

pool.connect()
.then(() => console.log('connected to db successfuly'))
.catch((e) => console.log(e))

module.exports = {
    query: (text, callback) => {
        return pool.query(text, (err, res) => {
          callback(err, res)
        })
    },
  }