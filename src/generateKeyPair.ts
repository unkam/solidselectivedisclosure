

import {
  generateBls12381G2KeyPair,
} from "@mattrglobal/node-bbs-signatures";
import {encode} from 'base58-universal';

const main = async (): Promise<void> => {
  //Generate a new key pair
  const keyPair = await generateBls12381G2KeyPair();
  const encodedPublic = encode(keyPair.publicKey);
  const encodedSecret = encode(keyPair.secretKey);
  console.log(`Public key base58 = ${encodedPublic}`)
  console.log(`Secret key base58 = ${encodedSecret}`)
  console.log("Key pair generated");
  console.log(`Public key base64 = ${Buffer.from(keyPair.publicKey).toString("base64")}`);
  console.log(`Secret key base64 = ${Buffer.from(keyPair.secretKey).toString("base64")}`);

};


main();
