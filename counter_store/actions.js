const { Store } = require("fs-json-store");
const path = require("path");
const filePath = path.join(__dirname, "counter.json");
const store = new Store({ file: filePath });

const range = parseInt(process.env.COUNTER_RANGE);

const setRange = async (from) => {
	await store.write({ from: from, to: from + range });
};

const getRange = async () => {
	let data = await store.read();
	if (!data) {
		data = {
			from: 0,
			to: range,
		};
	}
	return {
		from: data.from,
		to: data.to,
	};
};

module.exports = {
	setRange,
	getRange,
};
