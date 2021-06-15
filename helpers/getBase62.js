const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const BASE = CHARS.length;
const LENGTH = 7;

const getBase62 = (num) => {
	let res = "";
	for (let i = 0; i < LENGTH; i++) {
		res += CHARS[num % BASE];
		num = Math.floor(num / BASE);
	}
	return res;
};

module.exports = getBase62;
