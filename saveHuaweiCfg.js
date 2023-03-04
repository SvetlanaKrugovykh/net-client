const net = require('net');
const { HOST, username, password, cliArray } = require('./data/saveHuawei.model');
const PORT = 23; // Telnet port

let store = [];
let authorized = false;
let itsMore = false;
let i = 0;

const client = new net.Socket();

async function wait(msec) {
	return new Promise((resolve) => setTimeout(resolve, msec));
  }

console.log('Saving config for Huawei, ip = ', HOST);

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
	} else if (buffer.startsWith('---- More ----') || buffer.endsWith('---- More ----')) {
		itsMore = true;
		store.push(buffer);
		console.log('Get more');
		client.write(' ');
		console.log('Sent first ENTER');
	} else {
		if (authorized && (buffer.length > 1)) {
			// if (i === cliArray.length) {
			// 	console.log("555", buffer);
			// 	store.push(buffer);
			// 	client.on('close', () => {
			// 		console.log('Connection closed');
			// 		console.dir(store);
			// 	});
			// }
			console.log("333", buffer);
			store.push(buffer);
			if (itsMore) {
				wait(1000).then(() => {
					client.write('\n');
					console.log('Sent next ENTER');
				});   
			} else {
				if (i <= cliArray.length) {
				client.write(cliArray[i] + '\n');
				i++;
				}
			}
		}
	}
	buffer = '';
});

