const { Pool } = require('pg');

const connectionString = 'postgres://cdmgtche:AYc6tQCegRwOc3IEx7Dx-FbhYXFBXIdj@berry.db.elephantsql.com/cdmgtche'

const pool = new Pool({
  connectionString
})

module.exports = pool;