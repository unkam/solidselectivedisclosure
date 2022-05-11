# solidid

This library allows to sign and verify credentials, including the ability to create and verify selective disclosure using BBS+ encyrption and store/share them using Solid

all documents and Proofframe are stored in src/data

Proofframe can be adapted by deleting lines
Login data have to included in Upload/Download Scripts


Set-Up

This library uses SolidNodeClient, this requires all Pods to add https://solid-node-client as trusted application with full access
Clone the library

run
```
yarn install --frozen-lockfile
```


//Add section for Key pair generation
The Solid credentials have to be specified in the respective js Scripts.

Following this order for regular demo process:

issuer:
The issuer takes an Input JSON-LD Credential and Uploads it to their Solid Pod
They then take it and sign it with their BBS keypair and upload the Signed Credential and makes it available to the credential holder
//availablity to included in next iteration


navigate to ./issuer:
run in terminal
```
node uploadInput.js
node downloadUnsigned.js
yarn sign
node uploadSigned.js
```

holder:
The holder can obtain his credential from the issuer and derive a selective Proof only providing the minimum necessary information to the verifier and upload the derived Proof to the verifier
//availablity to included in next iteration

navigate to ./holder:
run in terminal

```
node downloadSigned.js
yarn deriveProof
node uploadProof.js
```
The holder can also verify their own credential and store the full credential in their Solid Pod (optional)
```
yarn verify
node uploadSigned.js
```


verifier:
The verifier can verifiy the provided selective proof and store the verified Proof in their Solid Pod (optional consider data privacy).

navigate to ./verifier:
run in terminal
```
node downloadProof.js
yarn verifyProof
node uploadVerifiedProof.js
```
If the holder provides his full credential he can also verify this (to be merged)
```
(node downloadSigned.js)
(yarn verify)
(node uploadVerifiedDocument.js)

