import { assert } from "chai";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { SolanaCounter } from "../target/types/solana_counter";
import { readFileSync } from "fs";

describe("solana-counter", () => {
  
  // One way to set provider is to use AnchorProvider.env()
  // to use below settings, make sure you have below env variables set
  // export ANCHOR_PROVIDER_URL=http://localhost:8899
  // export ANCHOR_WALLET=/home/kunal.saini/.config/solana/id.json
  // const provider = anchor.AnchorProvider.env();
  // anchor.setProvider(anchor.AnchorProvider.env());

  // Another way to set provider is to use AnchorProvider constructor
  // const key_file = '/home/kunal.saini/.config/solana/id.json';
  // const keypair = Keypair.fromSecretKey(
  //   new Uint8Array(JSON.parse(readFileSync(key_file, 'utf-8')))
  // )
  // const connection = new Connection('http://localhost:8899', 'confirmed');
  // const wallet = new anchor.Wallet(keypair)
  // const provider = new anchor.AnchorProvider(connection, wallet, {
  //   preflightCommitment: 'confirmed',
  // });
  // anchor.setProvider(provider);
  // const counter = anchor.web3.Keypair.generate();

  const program = anchor.workspace.SolanaCounter as Program<SolanaCounter>;

  const [counter] = PublicKey.findProgramAddressSync(
    [Buffer.from('counter')],
    program.programId,
  ) 

  it("Is initialized!", async () => {
    await program.methods.initialize()
    // .accounts({
    //   counter: counter,
    //   user: provider.wallet.publicKey,
      // system_program: anchor.web3.SystemProgram.programId,
      // system_program is not necessary it seems in new version of anchor
    // })
    // .signers([counter])
    .rpc();
  });

  it("Increments!", async () => {
    await program.methods
    .increment()
    .accounts({
      counter: counter,
    })
    .rpc();

    const account = await program.account.counter.fetch(counter);
    assert.ok(account.count.eq(new anchor.BN(1)));
  })

  it("Decrements!", async () => {
    await program.methods
    .decrement()
    .accounts({
      counter: counter,
    })
    .rpc();

    const account = await program.account.counter.fetch(counter);
    assert.ok(account.count.eq(new anchor.BN(0)));
  })
});
