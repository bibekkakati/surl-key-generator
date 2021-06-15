const axios = require("axios");

const Agent = require("agentkeepalive");
const keepAliveAgent = new Agent({
	maxSockets: 10,
	maxFreeSockets: 5,
	timeout: 60000 * 2, // active socket keepalive for 15 minutes
	freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const axiosInstance = axios.create({ httpAgent: keepAliveAgent });

module.exports = axiosInstance;
