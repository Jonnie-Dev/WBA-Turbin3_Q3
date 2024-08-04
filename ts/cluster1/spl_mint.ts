import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("3GacodAh6tGfod1FikZHEses31nj9g1USDjBniSiWRWW");

(async () => {
  try {
    // Create an ATA - Associated Token Account
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    ); // allowOwnerOffCurve false by default

    // Every ATA is a PDA derived from the mint

    console.log(`Your ata is: ${ata.address.toBase58()}`);
    // ATA -> H6GPRxDZRA4UweSUdzrv7h6SE5Gf5wD7gGVoNNgwN9mP
    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair,
      10n * token_decimals
    );
    // console.log(`Your mint txid: ${mintTx}`);
    console.log(
      `Check your transaction here: https://explorer.solana.com/tx/${mintTx}?cluster=devnet`
      // https://explorer.solana.com/tx/3TYzLH2AEMhN8UEDqCTae7gUET89PMDJMrjBLL3vdJxftMWXvm4Y5xzaKXgMJ1LWsNusTsekmTBh1raJfHpVANRV?cluster=devnet
    );
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
