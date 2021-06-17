const { getRange, setRange } = require("../counter_store/actions");
const { insertServerInfo } = require("../queries/key_range_list");
const getBase62 = require("./getBase62");

const generateKeys = async (serverId) => {
	const keys = [];
	const range = await getRange();
	let from = range.from;
	let to = range.to;
	setRange(to);
	insertServerInfo(from, to, serverId);
	while (from < to) {
		keys.push(getBase62(from));
		from++;
	}
	return keys;
};

module.exports = generateKeys;
