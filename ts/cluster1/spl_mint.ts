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
const mint = new PublicKey("9banR4c2aPCvmkwVNKVX4sQP3BSxwyD22cWVYjRdkVoM");

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
    // ATA -> A3vESKA39vDVsA5aQz61g7JiT8wnYunsjAzFNBmjLeiN
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
    );
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
