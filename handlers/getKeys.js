const generateKeys = require("../helpers/generateKeys");

const getKeys = async (call, callback) => {
	const serverId = call.request.id;
	const keys = await generateKeys(serverId);
	if (keys.length > 0) {
		callback(null, {
			success: true,
			keys: keys,
		});
	} else {
		console.log("KEY GENERATION ERROR");
		callback(null, {
			success: false,
		});
	}
};

module.exports = getKeys;
