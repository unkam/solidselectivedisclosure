const { SolidNodeClient } = require('solid-node-client');
const SolidFileClient = require('solid-file-client');
var path = require('path');
const remoteUrl = 'https://test13init.solidcommunity.net/credentials/verifiedProof.json';
const localUrl =  path.join(__dirname, "./data/verifiedProof.json");
const fs = require('fs');


async function main(){
const client = new SolidNodeClient();
const fileClient = new SolidFileClient(client);
const session = await client.login({
    idp : 'https://solidcommunity.net', 
    username : "test13init",
    password : "test13init",
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
console.log(`Downloaded verified proof to ${localUrl}`)
}
main();



