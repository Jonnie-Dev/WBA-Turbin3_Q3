// import {
//   updateV1,
//   fetchMetadataFromSeeds,
//   DataV2Args,
// } from "@metaplex-foundation/mpl-token-metadata";
// import wallet from "../wba-wallet.json";
// import { createSignerFromKeypair, publicKey } from "@metaplex-foundation/umi";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

// let data: DataV2Args = {
//   name: "Not Bitcoin",
//   symbol: "nBTC",
//   uri: "https://arweave.net/4dlYjxsVSxwyHbLlyqnQkI8AMoyu7mXFYj7Bm75aKAg",
//   sellerFeeBasisPoints: 100, // 1% fee
//   creators: null,
//   collection: null,
//   uses: null,
// };

// // Create a UMI connection
// const umi = createUmi("https://api.devnet.solana.com", "confirmed");
// const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
// const signer = createSignerFromKeypair(umi, keypair);

// const mint = publicKey("3GacodAh6tGfod1FikZHEses31nj9g1USDjBniSiWRWW");

// (async () => {
//   try {
//     const initialMetadata = await fetchMetadataFromSeeds(umi, { mint });
//     await updateV1(umi, {
//       mint,
//       data: {
//         ...initialMetadata,
//         uri: "https://arweave.net/4dlYjxsVSxwyHbLlyqnQkI8AMoyu7mXFYj7Bm75aKAg",
//       },
//     }).sendAndConfirm(umi);
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();
import {
  updateV1,
  fetchMetadataFromSeeds,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json";

import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

const umi = createUmi("https://api.devnet.solana.com", "confirmed");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

// Set the signer on the Umi instance
umi.use(signerIdentity(signer));

const mint = publicKey("3GacodAh6tGfod1FikZHEses31nj9g1USDjBniSiWRWW");
(async () => {
  try {
    const initialMetadata = await fetchMetadataFromSeeds(umi, { mint });
    await updateV1(umi, {
      mint,
      data: {
        ...initialMetadata,
        uri: "https://arweave.net/fwrlIwe544-BMxI4xTYwlhViQuTskQDqppNBzVqJ_wM",
      },
    }).sendAndConfirm(umi);
    console.log("Update Successful");
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
