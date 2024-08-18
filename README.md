# Solana Counter Project

This project demonstrates a basic Solana smart contract for a counter application.

## Prerequisites
Clone the repo
```sh
git clone https://github.com/yourusername/solana-counter.git
cd solana-counter
```

Make sure you have following dependencies installed on your system:

### cli tools
- anchor-cli: 0.30.1
- solana-cli: 1.18.22

### Node dependencies
- solana/web3.js: 1.95.2
- types/node: 22.4.0
- typescript: 4.3.5

You can install node dependencies using 
```sh
npm install @solana/web3.js@1.95.2 @types/node@22.4.0 typescript@4.3.5
```

change `key_file` to your actual wallet keypair file path in [tests/solana-counter.ts](tests/solana-counter.ts). I have attached the keypair file [id.json](id.json) used for this project


To run the project, follow these steps:
```sh
anchor build

# run solana-test-validator, if on localnet
anchor deploy

# run client side, build using npx
cd client
npx tsc

# run the client now
node index.js
```

You shoule be able to see expected out like this:
```sh
client ➤ node index.js

trying to initialize counter
Counter initialized with public key: G5mQ3TcxEiJmShPeLUcRVDxautjLNmE5E9uxHbFUPgwV
Counter incremented to: 1
Counter decremented to: 0
```