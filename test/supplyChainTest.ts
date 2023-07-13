import { ethers, waffle } from 'hardhat';
import { expect } from 'chai';
import { ArtworkMarketplace } from '../artifacts/contracts/ArtworkMarketplace.sol/ArtworkMarketplace.json';
import { ArtworkMarketplace } from '../frontend/src/typechain/ArtworkMarketplace';

const { deployContract } = waffle;

describe('ArtworkMarketplace tests', function () {
  let artworkMarketplace;
  let owner;
  let otherAccounts;

  beforeEach(async function () {
    [owner, ...otherAccounts] = await ethers.getSigners();
    artworkMarketplace = await deployContract(owner, ArtworkMarketplace);
  });

  describe('ArtworkMarketplace functions', function () {
    it('Should add an artwork', async function () {
      await artworkMarketplace.addArtwork('Artwork description', 'Artwork image', 100, 'Creator credentials', 10);

      const artwork = await artworkMarketplace.artworks(1);
      expect(artwork.description).to.equal('Artwork description');
      expect(artwork.image).to.equal('Artwork image');
      expect(artwork.price).to.equal(100);
      expect(artwork.creatorCredentials).to.equal('Creator credentials');
      expect(artwork.quantity).to.equal(10);
      expect(artwork.creator).to.equal(owner.address);
      expect(artwork.deliveryStatus).to.equal(0); // DeliveryStatus.NotDelivered
    });

    it('Should update the quantity of an artwork', async function () {
      await artworkMarketplace.addArtwork('Artwork description', 'Artwork image', 100, 'Creator credentials', 10);

      await artworkMarketplace.updateArtworkQuantity(1, 5);

      const artwork = await artworkMarketplace.artworks(1);
      expect(artwork.quantity).to.equal(5);
    });

    it('Should update the delivery status of an artwork', async function () {
      await artworkMarketplace.addArtwork('Artwork description', 'Artwork image', 100, 'Creator credentials', 10);

      await artworkMarketplace.updateArtworkDeliveryStatus(1, 1); // DeliveryStatus.Delivered

      const artwork = await artworkMarketplace.artworks(1);
      expect(artwork.deliveryStatus).to.equal(1);
    });

    it('Should place an order for an artwork', async function () {
      await artworkMarketplace.addArtwork('Artwork description', 'Artwork image', 100, 'Creator credentials', 10);

      await artworkMarketplace.placeOrder(1);

      const order = await artworkMarketplace.orders(1);
      expect(order.artworkId).to.equal(1);
      expect(order.buyer).to.equal(otherAccounts[0].address);
      expect(order.confirmed).to.equal(false);
    });

    it('Should confirm an order', async function () {
      await artworkMarketplace.addArtwork('Artwork description', 'Artwork image', 100, 'Creator credentials', 10);
      await artworkMarketplace.placeOrder(1);

      await artworkMarketplace.confirmOrder(1, { value: 100 });

      const order = await artworkMarketplace.orders(1);
      const artwork = await artworkMarketplace.artworks(1);
      expect(order.confirmed).to.equal(true);
      expect(artwork.quantity).to.equal(9);
    });

    it('Should place a bid', async function () {
      await artworkMarketplace.addArtwork('Artwork description', 'Artwork image', 100, 'Creator credentials', 10);

      await artworkMarketplace.placeBid(1, 200, { value: 200 });

      const bid = await artworkMarketplace.bids(1);
      expect(bid.artworkId).to.equal(1);
      expect(bid.bidder).to.equal(otherAccounts[0].address);
      expect(bid.amount).to.equal(200);
    });

    it('Should issue a certificate', async function () {
      const tokenId = await artworkMarketplace.issueCertificate(1, 12345, 'Token URI');

      const certificateData = await artworkMarketplace.getCertificateData(tokenId);
      expect(certificateData.artworkId).to.equal(1);
      expect(certificateData.issueDate).to.equal(12345);
    });
  });
});
