const { SolidNodeClient } = require('solid-node-client');
const SolidFileClient = require('solid-file-client');
var path = require('path');
const remoteUrl = 'https://issuer13.solidcommunity.net/public/credentials/unsignedDocument.json';
const localUrl =  path.join(__dirname, "../src/data/unsignedDocument.json");
const fs = require('fs');


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
const content = await fileClient.readFile(remoteUrl, JSON.stringify(remoteUrl, null, 2))
fs.writeFile(localUrl, content, err => {
    if (err) {
      console.error(err)
      return
      }
    });
    console.log(content)
console.log(`Downloaded unsigned Credential to ${localUrl}`)
}
main();



