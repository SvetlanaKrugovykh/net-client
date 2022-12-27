const net = require('net');
const { host, strMatch, keyWord, cliArray } = require('./data/telnet.model');


let store = [];
let i = 0;
let outputObj;
let authorized = false;
let start = true;
let secondStep = true;

const socket = net.createConnection(23, host, () => {
	process.stdin.pipe(socket);
	process.stdin.setEncoding('utf8');
});


socket.on('data', chunk => {
	let str = chunk.toString().trim();
	if (start) {
		setTimeout(() => {
			start = false;
			return;
		}, 1000);
	}

	if (secondStep) {
		setTimeout(() => {
			socket.write(strMatch[0].output);
			secondStep = false;
		}, 1000);
	}

	if (i === cliArray.length) {
		store.push(str);
		socket.end();
		console.dir(store);
		return;
	}

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
			if (outputObj.input === keyWord) {
				console.log("Authority successful");
				authorized = true;
			}
		}

	}
});
