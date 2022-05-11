
/// <reference types="node" />

import {
    Bls12381G2KeyPair,
    BbsBlsSignature2020,
    BbsBlsSignatureProof2020,
    deriveProof
  } from "@mattrglobal/jsonld-signatures-bbs";
  import { extendContextLoader, sign, verify, purposes } from "jsonld-signatures";
  
  import inputDocument from "./data/inputDocument.json";
  import signedDocument from "./data/signedDocument.json";
  import derivedProof from "./data/derivedProof.json";
  import keyPairOptions from "../verifier/keyPair.json";
  import ControllerDoc from "./data/controllerDocument.json";
  import bbsContext from "./data/bbs.json";
  import revealDocument from "./data/deriveProofFrame.json";
  import citizenVocab from "./data/citizenVocab.json";
  import credentialContext from "./data/credentialsContext.json";
  import fs from 'fs';
import { callbackify } from "util";
  
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const documents: any = {
    "did:web:https://issuer13.solidcommunity.net/#test": keyPairOptions,
    "did:web:https://issuer13.solidcommunity.net/": ControllerDoc,
    "https://w3id.org/security/bbs/v1": bbsContext,
    "https://w3id.org/citizenship/v1": citizenVocab,
    "https://www.w3.org/2018/credentials/v1": credentialContext
  };
  
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const customDocLoader = (url: string): any => {
    const context = documents[url];
  
    if (context) {
      return {
        contextUrl: null, // this is for a context via a link header
        document: context, // this is the actual document that was loaded
        documentUrl: url // this is the actual context URL after redirects
      };
    }
  
    console.log(
      `Attempted to remote load context : '${url}', please cache instead`
    );
    throw new Error(
      `Attempted to remote load context : '${url}', please cache instead`
    );
  };
  
  //Extended document load that uses local contexts
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const documentLoader: any = extendContextLoader(customDocLoader);
  
  const main = async (): Promise<void> => {
    //Import the example key pair
    const keyPair = await new Bls12381G2KeyPair(keyPairOptions);
  
    console.log("Input document");
    console.log(JSON.stringify(inputDocument, null, 2));
  

    //Verify the derived proof Verifier -- Identical with verify document --> merge
    let verified = await verify(derivedProof, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader
    });

    console.log("Verification result");
    console.log(JSON.stringify(verified, null, 2));
    

    var path = require('path');
    fs.writeFile(path.join(__dirname, "./data/verifiedProof.json"), JSON.stringify(verified, null, 2), err => {
        if (err) {
          console.error(err)
          return
          }
      });

  };





  main();