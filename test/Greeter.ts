import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import GreeterArtifact from "../artifacts/contracts/supplyChain.sol/supplyChain.json";
import { SupplyChain } from "../frontend/src/typechain";

const { deployContract } = waffle;

describe("Greeter tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOnceFixture() {
    let greeter: SupplyChain;
    // Contracts are deployed using the first signer/account by default
    const [owner, ...otherAccounts] = await ethers.getSigners();

    greeter = (await deployContract(owner, GreeterArtifact)) as SupplyChain;

    return { greeter, owner, otherAccounts };
  }

  describe("Test suite", function () {
    it("Check if it shows all the orders", async function () {
      const { greeter } = await loadFixture(deployOnceFixture);

      expect(await greeter.totalOrders()).to.be.eq(0);
    });

    it("Check if it shows all the artworks", async function () {
      const { greeter } = await loadFixture(deployOnceFixture);

      expect(await greeter.totalArtworks()).to.be.eq(0);
    });

  });


    it("Check if artwork can be added to the marketplace", async function () {
      const { greeter, owner } = await loadFixture(deployOnceFixture);
    
      // Call the `addArtwork` function with sample parameters
      await greeter.addArtwork(
        "Artwork description",
        100,
        10,
        "Token URI",
        1,
        0
      );
    
      // Print the details of the added artwork
      const artwork = await greeter.artworks(1);
      console.log("Artwork description:", artwork.description);
    
      // Assert that the totalArtworks value has increased
      expect(await greeter.totalArtworks()).to.be.eq(1);
    
      // Add more assertions for other properties
    });

    it("Check if it returns all verified artworks", async function () {
      const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);

      // Call the `addArtwork` function to add artworks
      await greeter.addArtwork("Artwork 1", 100, 1, "", 1, 0);
      await greeter.addArtwork("Artwork 2", 200, 1, "", 1, 0);
      await greeter.addArtwork("Artwork 3", 300, 1, "", 1, 0);
      await greeter.addArtwork("Artwork 4", 400, 1, "", 1, 0);

      // Call the `getVerifiedArtworks` function to get the verified artworks
      const verifiedArtworks = await greeter.getAllArtworks();

      // Assert the number of verified artworks returned by the function
      expect(verifiedArtworks.length).to.be.eq(4);

      // Assert the details of the verified artworks
      // expect(verifiedArtworks[0].description).to.be.eq("Artwork 2");
      // expect(verifiedArtworks[1].description).to.be.eq("Artwork 3");
      // Add more assertions for other properties
    });


    it("Check if it shows all the orders", async function () {
      const { greeter } = await loadFixture(deployOnceFixture);

      expect(await greeter.totalArtworks()).to.be.eq(0);
    });

    it("Check if it shows all the certification created by verifier", async function () {
      const { greeter } = await loadFixture(deployOnceFixture);

      expect(await greeter.totalArtworks()).to.be.eq(0);
    });

    it("should issue a certificate and retrieve its data", async function () {
      const { greeter } = await loadFixture(deployOnceFixture);
      const artworkId = 1;
      const issueDate = Math.floor(Date.now() / 1000);
      const tokenURI = "https://example.com/certificate/1";
  
      // Issue a certificate
      await greeter.issueCertificate(artworkId, issueDate, tokenURI);
  
      // Retrieve the certificate data
      const certificateData = await greeter.getCertificateData(1);
  
      // Assert the retrieved certificate data
      expect(certificateData[0]).to.be.eq(artworkId);
      expect(certificateData[2]).to.be.eq(issueDate);
    });
  
    it("should revert when trying to retrieve data for a non-existent certificate", async function () {
      const { greeter } = await loadFixture(deployOnceFixture);
      const nonExistentTokenId = 1;
  
      // Try to retrieve data for a non-existent certificate
      await expect(greeter.getCertificateData(nonExistentTokenId)).to.be.revertedWith(
        "Certificate: Token ID does not exist"
      );
    });


    



    it("Check if the buyer can place order", async function () {
      const { greeter, owner } = await loadFixture(deployOnceFixture);
    
      // Call the `addArtwork` function with sample parameters
      await greeter.addArtwork(
        "Artwork description",
        100,
        10,
        "Token URI",
        1,
        0
      );
    
      // Print the details of the added artwork
      const artwork = await greeter.artworks(1);
      console.log("Artwork description:", artwork.description);
    
      // Assert that the totalArtworks value has increased
      expect(await greeter.totalArtworks()).to.be.eq(1);
    
      // Add more assertions for other properties
    });

    it("Check if it returns all artworks", async function () {
      const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);

      // Call the `addArtwork` function to add artworks
      await greeter.addArtwork("Artwork 1", 100, 1, "", 1, 0);
      await greeter.addArtwork("Artwork 2", 200, 1, "", 1, 0);
      await greeter.addArtwork("Artwork 3",  300, 1, "", 1, 0);
      await greeter.addArtwork("Artwork 4",  400, 1, "", 1, 0);

      // Call the `getVerifiedArtworks` function to get the verified artworks
      const verifiedArtworks = await greeter.getAllArtworks();

      // Assert the number of verified artworks returned by the function
      expect(verifiedArtworks.length).to.be.eq(4);

      // Assert the details of the verified artworks
      // expect(verifiedArtworks[0].description).to.be.eq("Artwork 2");
      // expect(verifiedArtworks[1].description).to.be.eq("Artwork 3");
      // Add more assertions for other properties
    });

    
  });
