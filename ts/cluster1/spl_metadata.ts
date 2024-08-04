import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";

import { PublicKey } from "@solana/web3.js";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Define our Mint address
const mint = publicKey("3GacodAh6tGfod1FikZHEses31nj9g1USDjBniSiWRWW");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com", "confirmed");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(irysUploader());
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint: mint,
      mintAuthority: signer,
    };

    let data: DataV2Args = {
      name: "Not Bitcoin",
      symbol: "nBTC",
      uri: "https://arweave.net/z3NyQmRLSTOEeiLL9Bwm67pObuhKRWzlgFv86hLZKWo",
      sellerFeeBasisPoints: 100, // 1% fee
      creators: null,
      collection: null,
      uses: null,
    };

    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    let result = await tx.sendAndConfirm(umi);
    let signatre = bs58.encode(result.signature);
    console.log(
      `Check your transaction here: https://explorer.solana.com/tx/${signatre}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
