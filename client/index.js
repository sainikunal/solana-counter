"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const anchor = __importStar(require("@coral-xyz/anchor"));
const anchor_1 = require("@coral-xyz/anchor");
const web3_js_1 = require("@solana/web3.js");
const provider = anchor_1.AnchorProvider.env();
anchor.setProvider(provider);
const programId = new web3_js_1.PublicKey('4czQLEmBScpEwEGK9ZSPbYCDR382MmqdsrPufmpMVsZB');
const program = new anchor_1.Program(require('../target/idl/solana_counter.json'), 
// programId,
provider);
function initializeCounter() {
    return __awaiter(this, void 0, void 0, function* () {
        const counter = anchor.web3.Keypair.generate();
        yield program.methods
            .initialize()
            .accounts({
            counter: counter.publicKey,
            user: provider.wallet.publicKey,
        })
            .signers([counter])
            .rpc();
        console.log('Counter initialized with public key:', counter.publicKey.toBase58());
        return counter.publicKey;
    });
}
function incrementCounter(counterPublicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield program.methods
            .increment()
            .accounts({
            counter: counterPublicKey,
        })
            .rpc();
        const account = yield program.account.counter.fetch(counterPublicKey);
        console.log('Counter incremented to:', account.count.toString());
    });
}
function decrementCounter(counterPublicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield program.methods
            .decrement()
            .accounts({
            counter: counterPublicKey,
        })
            .rpc();
        const account = yield program.account.counter.fetch(counterPublicKey);
        console.log('Counter decremented to:', account.count.toString());
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("trying to initialize counter");
        const counterPublicKey = yield initializeCounter();
        yield incrementCounter(counterPublicKey);
        yield decrementCounter(counterPublicKey);
    }
    catch (error) {
        console.error(error);
    }
}))();
// export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
// export ANCHOR_WALLET=~/.config/solana/id.json
