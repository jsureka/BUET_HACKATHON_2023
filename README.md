# Supply Chain Application

Basic Requirements:

1. Supply Chain Streamline Process Of Artworks
2. Verify artwork’s Authenticity Ownership

Seller's Role
1. Upload artwork and it's Metadata 
2. Store Artwork Images and Metadata in the IPFS 
3. Upload the Corresponding Hash to the Blockchain
4. Initiate Delivery and show the full delivery process along with updating the Delivery Status.
5. Show Premium artworks in the Art Marketplace for bidding

Buyer's Role
1. Browse, search and filter the artworks
2. Can Place order to buy preferable artwork with 10% price
3. Can confirm buying process by paying remaining 90% after delivery
4. Can place a bid for premium artworks
5. Can verify the certificate of authenticity

Verifier's Role
1. Verify an artwork
2. Issue Certificate against the artwork
3. Make the certificate soul bound NFT

Starting project with typescript hardhat projects:

## Instruction
- Compile:
```
npm run compile
```
- Run test:
```
npm run test
```
- Deploy
```
npm run deploy:<network>
```
- Verify on etherscan
```
npx hardhat verify --network rinkeby <YOUR_CONTRACT_ADDRESS>
```

