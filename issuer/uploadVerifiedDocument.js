const { SolidNodeClient } = require('solid-node-client');
const SolidFileClient = require('solid-file-client');
var path = require('path');
const remoteUrl = 'https://issuer13.solidcommunity.net/public/credentials/verifiedDocument.json';
const localUrl = require (path.join(__dirname, "../src/data/verifiedDocument.json"));


async function main(){
const client = new SolidNodeClient();
const fileClient = new SolidFileClient(client);
const session = await client.login({
    idp : 'https://solidcommunity.net', // e.g. https://solidcommunity.net
    username : "issuer13",
    password : "issuer13unkam",
  });

// you can now do authenticated reading & writing on that pod
// or any pod on an NSS server that your WebID has access to
console.log('Logged In', session.isLoggedIn)
console.log(session)
console.log(localUrl)
const res = await fileClient.putFile(remoteUrl, JSON.stringify(localUrl, null, 2))
console.log(`${res.status} Uploaded Verified Document to ${res.url}`)
}
main();



