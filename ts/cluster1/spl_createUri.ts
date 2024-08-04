import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { CreateMetadataAccountV3InstructionAccounts } from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
  createGenericFile,
} from "@metaplex-foundation/umi";

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
    const metadata = {
      name: "Not Bitcoiin",
      symbol: "nBTC",
      description:
        "A smarter, faster, and more efficient alternative to Bitcoin. Experience the future of digital currency with nBTC",
      image: "https://arweave.net/QR0FJDlHA74f-E7xov73JUJhRUh6TJRYZQNAFM51Pv8",
    };

    const umiJSOnFile = createGenericFile(
      JSON.stringify(metadata),
      "Jonnie-mint-metadata",
      {
        tags: [{ name: "Content-Type", value: "JSON" }],
      }
    );

    const Uri = await umi.uploader.upload([umiJSOnFile]).catch((err) => {
      throw new Error(err);
    });
    console.log("Your token URI: ", Uri);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
