import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed"; // achieve 66% of mined blocks
// processed, confirmed, finalised
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    // minted -> 3GacodAh6tGfod1FikZHEses31nj9g1USDjBniSiWRWW
    const payer = keypair; // the account paying for the mint
    const mintAuthority = keypair; // account authorized to mint token
    const freezeAuthority = null; // account authorized to freeze token

    const mint = await createMint(
      connection,
      payer,
      mintAuthority.publicKey,
      freezeAuthority,
      6
    );

    console.log("Mint public address: ", mint.toBase58());
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
