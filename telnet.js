const net = require('net');
const { setTimeout } = require('timers/promises');
const { HOST, username, password, cliArray } = require('./data/telnet.model');
const PORT = 23; // Telnet port

let store = [];
let authorized = false;
let i = 0;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
	console.log('Connected to network device');
});

let buffer = '';

client.on('data', (data) => {
	buffer += data.toString().trim();
	if (buffer.includes('Username:')) {
		client.write(username);
	} else if (buffer.startsWith('Password:')) {
		client.write(password);
		authorized = true;
	} else {
		if (authorized && (buffer.length > 1)) {
			if (i === cliArray.length) {
				store.push(buffer);
				client.on('close', () => {
					console.log('Connection closed');
				});
				console.dir(store);
				return;
			}
			store.push(buffer);
			client.write(cliArray[i] + '\n');
			i++;
		}
	}

	buffer = '';
});

