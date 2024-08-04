<h1 align="center">
  <br>
  <img src="https://github.com/user-attachments/assets/9bc71132-0c3f-49d7-922f-9acfc636ad33" alt="turbin3 logo" />
  <br>
  Cohort 2024 Q3
  <br>
</h1>

# Introduction

This repo showcases work done during the WBA Turbine 2024 Q3 Cohort. I am open for work; you can reach me via:

> X: [@JonnieDev](https://www.x.com/Jonnie-Dev) | Discord: j3ech | Email: [j3ech@gmail.com](mailto:jtech2096@gmail.com)

# Turbine3 Work

## Prerequisite Task

In the prerequisite task for the Turbin3 cohort, I made use of typescript to write scripts to generate a keypair, request/airdrop some devnet sol tokens to that keypair wallet, transfer sol, and enroll to the WBA registration program using the provided WBA PDA program.

Folder:

    /ts/prereqs/README.md

## Rust Registration

For the registration task, I repeated the pre-requisite task, but now using Rust

Folder:

    /rs/prereqs/README.md

## 240730 - Class 1

In Class 1 we created a working token initizalizer, created the associated token account (ATA) within our own wallet for that token, then minted tokens into that ATA. I used the following during the class for additional [documentation](https://spl.solana.com/token).

Files:

    ts/cluster1/spl_init.ts
    ts/cluster1/spl_mint.ts

Here is the mint [transaction](https://explorer.solana.com/tx/ok4BNDwLAXVbkenkDgUqcJVRkgZxYshiqqspAXuGQAbcaAPA9RbxrzhQsGHJeoVyn43E9h3rTKDxhepYM1MeJEg?cluster=devnet) of this class' work, which is the mint tx.

And here is the minted token (nBTC) with the updated metadata [address](https://explorer.solana.com/address/3GacodAh6tGfod1FikZHEses31nj9g1USDjBniSiWRWW/metadata?cluster=devnet)

## Necessary Run Tasks

1.  Standard install of necessary modules with either of the following commands

        npm install --force
        npm install --legacy-peer-deps

2.  Add a wba-wallet address private key locally, and double check <code>.gitignore</code> based on your wallet file naming convention
3.  After updating any ts files, use <code>node {name in package.json scripts}</code> to run them

        cd ts
        node spl_init
        node spl_mint

## 240731 - Class 2

// About blinks, solana actions

## 240801 - Class 3
