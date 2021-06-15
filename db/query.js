const request = require("../config/request");
const DB_CONFIG = require("../config/database");

const DB_NAME = "surls";
const KEY_GEN_TABLE = "key_gen_table";

const COL_FROM = "from";
const COL_TO = "to";
const COL_SERVER_ID = "serverId";

const createTable = async () => {
	const data = JSON.stringify({
		operation: "create_table",
		schema: DB_NAME,
		table: KEY_GEN_TABLE,
		hash_attribute: "from",
	});

	const config = { ...DB_CONFIG, data };

	try {
		const response = await request(config);
		const { message, error } = response.data;
		if (error) {
			console.log("CREATE TABLE ERROR: " + error);
		} else {
			console.log("CREATE TABLE INFO: " + message);
		}
	} catch (error) {
		console.log("CATCH CREATE TABLE ERROR: " + error.message);
	}
};

const insertServerInfo = async (from, to, serverId) => {
	if (from < 0 || to < 0 || !serverId) {
		throw new Error("INSERT SERVER INFO QUERY: args missing");
	}
	const data = JSON.stringify({
		operation: "insert",
		schema: DB_NAME,
		table: KEY_GEN_TABLE,
		records: [
			{
				[COL_FROM]: from,
				[COL_TO]: to,
				[COL_SERVER_ID]: serverId,
			},
		],
	});

	const config = { ...DB_CONFIG, data };

	try {
		const response = await request(config);
		const { inserted_hashes } = response.data;
		if (inserted_hashes.length > 0) {
			return [id, null];
		}
		return [null, null];
	} catch (error) {
		return [null, "Something went wrong"];
	}
};

module.exports = {
	createTable,
	insertServerInfo,
};
