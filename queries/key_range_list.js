const request = require("../config/request");
const DB_CONFIG = require("../config/database");

const DB_NAME = process.env.DB_NAME;
const KEY_RANGE_TABLE = "key_range_list";

const COL_RANGE = "range";
const COL_SERVER_ID = "serverId";

const createTable = async () => {
    const data = JSON.stringify({
        operation: "create_table",
        schema: DB_NAME,
        table: KEY_RANGE_TABLE,
        hash_attribute: "id",
    });

    const config = { ...DB_CONFIG, data };

    try {
        const response = await request(config);
        const { message, error } = response.data;
        if (error) {
            throw new Error(error);
        } else {
            console.log("CREATE TABLE INFO: " + message);
        }
    } catch (error) {
        console.log("CATCH CREATE TABLE ERROR: " + error.message);
        console.log("Check if table already exists");
    }
};

const insertServerInfo = async (from, to, serverId) => {
    if (from < 0 || to < 0 || !serverId) {
        throw new Error("INSERT SERVER INFO QUERY: args missing");
    }
    const range = from + ":" + to;
    const data = JSON.stringify({
        operation: "insert",
        schema: DB_NAME,
        table: KEY_RANGE_TABLE,
        records: [
            {
                [COL_RANGE]: range,
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
