const net = require('net');
const { host, strMatch, keyWord, cliArray } = require('./data/telnet.model');


let store = [];
let i = 0;
let outputObj;
let authorized = false;

const socket = net.createConnection(23, host, () => {
	process.stdin.pipe(socket);
});


socket.on('data', chunk => {
	let str = chunk.toString().trim();

	if (i === cliArray.length) { socket.end(); return; }

	if (authorized) {
		store.push(str);
		socket.write(cliArray[i] + '\n\r');
		i++;
	}

	if (str.length > 1) {
		outputObj = strMatch.find(item => item.input.includes(str));
		if (outputObj != undefined) {
			process.stdout.write(str);
			socket.write(outputObj.output);
			if (outputObj.input === keyWord) { authorized = true; }
		}
	}
});


