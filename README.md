# Sample Hardhat Project

🏠 Nillow – Decentralized Real Estate dApp
Nillow is a blockchain-based real estate marketplace dApp that allows users to buy, sell, approve, lend, and inspect properties through a secure and transparent smart contract system. Built with React (Vite) on the frontend and Hardhat (Ethereum) on the backend, it leverages MetaMask for user wallet integration and transaction signing.

🚀 Features
🏡 View real estate listings available for purchase
🔐 Buy property using MetaMask and smart contracts
📜 Smart contract-based escrow system for secure payment
✅ Seller approval & inspector verification before finalizing sale
💼 Support for multi-signer transactions (Buyer, Seller, Inspector, Lender)
🔗 Fully integrated with Ethereum blockchain via Hardhat

🧱 Tech Stack

| Layer           | Technology                         |
| --------------- | ---------------------------------- |
| Smart Contracts | Solidity, Hardhat                  |
| Frontend        | React (Vite), Tailwind CSS         |
| Blockchain      | Local Ethereum (Hardhat), MetaMask |
| Wallet          | MetaMask                           |


📂 Project Structure
nillow/
├── contracts/              # Solidity smart contracts
├── scripts/                # Deployment scripts (non-Ignition)
├── frontend/               # React + Vite frontend
│   ├── components/         # Reusable React components
│   └── App.jsx             # Main app logic
├── test/                   # Contract tests using Hardhat
├── hardhat.config.js       # Hardhat configuration
└── README.md               # Project documentation

⚙️ Getting Started
Prerequisites
Node.js and npm

MetaMask browser extension

Hardhat (npm install --save-dev hardhat)

Vite (npm create vite@latest)

1. Clone the repository
git clone https://github.com/ArjunMHZ/Nillow.git
cd nillow
2. Install Dependencies
Backend:
npm install
Frontend:
cd frontend
npm install
3. Start Local Blockchain Node
npx hardhat node
4. Deploy Smart Contracts
npx hardhat run ./scripts/deploy.js --network localhost

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract. But in this project, ✅ We're using manual deployment with scripts/deploy.js instead of Hardhat Ignition.


5. Start the Frontend (Vite)
cd frontend
npm run dev
Visit http://localhost:5173 in your browser.

🦊 MetaMask Setup
1. Open MetaMask.
2. Connect to the Localhost 8545 network.
3. Import one of the accounts provided by npx hardhat node using its private key.


📜 Smart Contract Flow
1. Seller lists a property
2. Buyer selects a property
3. Funds are transferred into escrow
4. Inspection is approved by an inspector
5. Lender optionally funds the transaction
6. All parties (seller, buyer, lender) sign the final approval
7. Property ownership is transferred on-chain


Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run ./scripts/deploy.js --network localhost
npx hardhat ignition deploy ./ignition/modules/Lock.js  //Not necessary in this project
```
