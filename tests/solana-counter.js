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
const chai_1 = require("chai");
const anchor = __importStar(require("@coral-xyz/anchor"));
const web3_js_1 = require("@solana/web3.js");
const fs_1 = require("fs");
describe("solana-counter", () => {
    // One way to set provider is to use AnchorProvider.env()
    // to use below settings, make sure you have below env variables set
    // export ANCHOR_PROVIDER_URL=http://localhost:8899
    // export ANCHOR_WALLET=/home/kunal.saini/.config/solana/id.json
    // const provider = anchor.AnchorProvider.env();
    // anchor.setProvider(anchor.AnchorProvider.env());
    // Another way to set provider is to use AnchorProvider constructor
    const key_file = '/home/kunal.saini/.config/solana/id.json';
    const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse((0, fs_1.readFileSync)(key_file, 'utf-8'))));
    const connection = new web3_js_1.Connection('http://localhost:8899', 'confirmed');
    const wallet = new anchor.Wallet(keypair);
    const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: 'confirmed',
    });
    anchor.setProvider(provider);
    const program = anchor.workspace.SolanaCounter;
    const counter = anchor.web3.Keypair.generate();
    it("Is initialized!", () => __awaiter(void 0, void 0, void 0, function* () {
        yield program.methods.initialize()
            .accounts({
            counter: counter.publicKey,
            user: provider.wallet.publicKey,
            // system_program: anchor.web3.SystemProgram.programId,
            // system_program is not necessary it seems in new version of anchor
        })
            .signers([counter])
            .rpc();
    }));
    it("Increments!", () => __awaiter(void 0, void 0, void 0, function* () {
        yield program.methods
            .increment()
            .accounts({
            counter: counter.publicKey,
        })
            .rpc();
        const account = yield program.account.counter.fetch(counter.publicKey);
        chai_1.assert.ok(account.count.eq(new anchor.BN(1)));
    }));
    it("Decrements!", () => __awaiter(void 0, void 0, void 0, function* () {
        yield program.methods
            .decrement()
            .accounts({
            counter: counter.publicKey,
        })
            .rpc();
        const account = yield program.account.counter.fetch(counter.publicKey);
        chai_1.assert.ok(account.count.eq(new anchor.BN(0)));
    }));
});
