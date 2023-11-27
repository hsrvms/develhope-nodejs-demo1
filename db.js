const { Pool } = require("pg");

const pool = new Pool({
	connectionString:
		"postgres://cdmgtche:AYc6tQCegRwOc3IEx7Dx-FbhYXFBXIdj@berry.db.elephantsql.com/cdmgtche",
});

module.exports = pool;