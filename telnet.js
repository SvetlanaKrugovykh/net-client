const net = require('net');
const { host, strMatch, keyWord, cliArray } = require('./data/telnet.model');

let outputObj;
let authorized = false;
let store = [];
let str = '';
let i = 0;

process.on('error', (err) => {
	console.log(err);
});

const socket = net.createConnection(23, host, () => {
	process.stdin.pipe(socket);
	process.stdin.setEncoding('utf8');
});


socket.on('data', chunk => {
	str = chunk.toString().trim();
	console.log(str);
	if (str.length > 1) {
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
		} else {
			outputObj = strMatch.find(item => item.input.includes(str));
			if (outputObj != undefined) {
				process.stdout.write(str);
				socket.write(outputObj.output);
				if (outputObj.input === keyWord) {
					authorized = true;
				}
			}
		}
	}
});

