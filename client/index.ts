import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider, web3 } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { SolanaCounter } from '../target/types/solana_counter';


const provider = AnchorProvider.env();
anchor.setProvider(provider);
const programId = new PublicKey('4czQLEmBScpEwEGK9ZSPbYCDR382MmqdsrPufmpMVsZB');

const program = new Program<SolanaCounter>(
    require('../target/idl/solana_counter.json'),
    provider
)

async function initializeCounter() {
    const counter = anchor.web3.Keypair.generate();
    await program.methods
        .initialize()
        .accounts({
            counter: counter.publicKey,
            user: provider.wallet.publicKey,
        })
        .signers([counter])
        .rpc();
    
    console.log('Counter initialized with public key:', counter.publicKey.toBase58());
    return counter.publicKey;
}

async function incrementCounter(counterPublicKey: PublicKey) {
    await program.methods
        .increment()
        .accounts({
            counter: counterPublicKey,
        })
        .rpc();
    const account = await program.account.counter.fetch(counterPublicKey);
    console.log('Counter incremented to:', account.count.toString());
}


async function decrementCounter(counterPublicKey: PublicKey) {
    await program.methods
        .decrement()
        .accounts({
            counter: counterPublicKey,
        })
        .rpc();
    const account = await program.account.counter.fetch(counterPublicKey);
    console.log('Counter decremented to:', account.count.toString());
}

(async () => {
    try {
        console.log("trying to initialize counter");
        const counterPublicKey = await initializeCounter();
    
        await incrementCounter(counterPublicKey);
    
        await decrementCounter(counterPublicKey);
    }
    catch (error) {
        console.error(error);
    }
})();

// export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
// export ANCHOR_WALLET=~/.config/solana/id.json