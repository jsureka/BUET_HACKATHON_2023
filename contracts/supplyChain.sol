// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtworkMarketplace is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;
  uint256 private tokenIdCounter;
  address payable verifier;
  mapping(uint256 => CertificateData) private certificates;
  mapping(uint256 => string) private tokenURIs;
  address payable owner;

  // Constructor
  constructor() ERC721("NFTMarketplace", "NFTM") {
    owner = payable(msg.sender);
  }

  // Struct to represent an artwork
  struct Artwork {
    uint256 id;
    string description;
    string image;
    uint256 price;
    string creatorCredentials;
    uint256 quantity;
    address creator;
    DeliveryStatus deliveryStatus;
    bool isVerified;
  }

  struct CertificateData {
    uint256 artworkId;
    address creator;
    uint256 issueDate;
  }

  // Enum to represent delivery status
  enum DeliveryStatus {
    NotDelivered,
    Delivered
  }

  // Mapping to store artworks by their ID
  mapping(uint256 => Artwork) public artworks;
  uint256 public totalArtworks;

  // Mapping to store the authenticity certificate for each artwork
  mapping(uint256 => address) public artworkCertificates;

  // Mapping to store the orders by their ID
  mapping(uint256 => Order) public orders;
  uint256 public totalOrders;

  // Mapping to store the bids for each auction
  mapping(uint256 => Bid) public bids;
  uint256 public totalBids;

  // Struct to represent an order
  struct Order {
    uint256 id;
    uint256 artworkId;
    address buyer;
    bool confirmed;
  }

  // Struct to represent a bid
  struct Bid {
    uint256 id;
    uint256 artworkId;
    address bidder;
    uint256 amount;
  }

  // Events to notify clients
  event ArtworkAdded(uint256 id);
  event ArtworkQuantityUpdated(uint256 id, uint256 quantity);
  event ArtworkDeliveryStatusUpdated(uint256 id, DeliveryStatus status);
  event OrderPlaced(uint256 id);
  event OrderConfirmed(uint256 id);
  event BidPlaced(uint256 id);

  // Modifier to check if the caller is the artwork creator
  modifier onlyCreator(uint256 artworkId) {
    require(
      msg.sender == artworks[artworkId].creator,
      "Only the artwork creator can perform this action"
    );
    _;
  }
  // Modifier to check if the caller is the artwork verifier
  modifier onlyVerifier(uint256 artworkId) {
    require(
      msg.sender != artworks[artworkId].creator,
      "Only the artwork verifier can perform this action"
    );
    _;
  }

  // Modifier to check if the artwork exists
  modifier artworkExists(uint256 artworkId) {
    require(artworks[artworkId].id != 0, "Artwork does not exist");
    _;
  }

  // Modifier to check if the order exists
  modifier orderExists(uint256 orderId) {
    require(orders[orderId].id != 0, "Order does not exist");
    _;
  }

  // Modifier to check if the bid exists
  modifier bidExists(uint256 bidId) {
    require(bids[bidId].id != 0, "Bid does not exist");
    _;
  }

  modifier isVerified(uint256 artworkId) {
    require(
      artworks[artworkId].isVerified == true,
      "This artwork is already verified"
    );
    _;
  }

  // Add an artwork to the marketplace
  function addArtwork(
    string memory description,
    string memory image,
    uint256 price,
    string memory creatorCredentials,
    uint256 quantity
  ) external payable {
    require(quantity > 0, "Quantity must be greater than 0");

    //     _tokenIds.increment();
    // uint256 newTokenId = _tokenIds.current();
    // _safeMint(msg.sender, newTokenId);
    // _setTokenURI(newTokenId, tokenURI);

    totalArtworks++;
    Artwork storage newArtwork = artworks[totalArtworks];
    newArtwork.id = totalArtworks;
    newArtwork.description = description;
    newArtwork.image = image;
    newArtwork.price = price;
    newArtwork.creatorCredentials = creatorCredentials;
    newArtwork.quantity = quantity;
    newArtwork.creator = msg.sender;
    newArtwork.deliveryStatus = DeliveryStatus.NotDelivered;

    emit ArtworkAdded(totalArtworks);
  }

  // Update the quantity of an artwork
  function updateArtworkQuantity(uint256 artworkId, uint256 quantity)
    external
    onlyCreator(artworkId)
    artworkExists(artworkId)
  {
    artworks[artworkId].quantity = quantity;
    emit ArtworkQuantityUpdated(artworkId, quantity);
  }

  // Update the delivery status of an artwork
  function updateArtworkDeliveryStatus(uint256 artworkId, DeliveryStatus status)
    external
    artworkExists(artworkId)
  {
    artworks[artworkId].deliveryStatus = status;
    emit ArtworkDeliveryStatusUpdated(artworkId, status);
  }

  // Place an order for an artwork
  function placeOrder(uint256 artworkId) external artworkExists(artworkId) {
    totalOrders++;
    orders[totalOrders] = Order(totalOrders, artworkId, msg.sender, false);
    emit OrderPlaced(totalOrders);
  }

  // Confirm an order by making a payment
  function confirmOrder(uint256 orderId) external payable orderExists(orderId) {
    Order storage order = orders[orderId];
    require(!order.confirmed, "Order is already confirmed");

    Artwork storage artwork = artworks[order.artworkId];
    require(artwork.quantity > 0, "Artwork is out of stock");

    // require(msg.value == artwork.price, "Incorrect payment amount");

    artwork.quantity--;
    order.confirmed = true;

    emit OrderConfirmed(orderId);
  }

  // Place a bid in the auction
  function placeBid(uint256 artworkId, uint256 amount)
    external
    payable
    artworkExists(artworkId)
  {
    require(amount > 0, "Bid amount must be greater than 0");

    totalBids++;
    bids[totalBids] = Bid(totalBids, artworkId, msg.sender, amount);

    emit BidPlaced(totalBids);
  }

  // Verify the authenticity certificate for an artwork
  // function verifyCertificate(uint256 artworkId, address certificate) external artworkExists(artworkId) isVerified(artworkId) {
  //     artworkCertificates[artworkId] = certificate;
  // }

  // Check the authenticity certificate for an artwork
  function checkCertificate(uint256 artworkId) external view returns (address) {
    return artworkCertificates[artworkId];
  }

  // verify certificate
  function issueCertificate(
    uint256 artworkId,
    uint256 issueDate,
    string memory tokenURI
  ) external onlyVerifier(artworkId) {
    uint256 tokenId = tokenIdCounter;
    tokenIdCounter++;

    certificates[tokenId] = CertificateData(
      artworkId,
      artworks[artworkId].creator,
      issueDate
    );
    tokenURIs[tokenId] = tokenURI;
    _setTokenURI(tokenId, tokenURI);
    _safeMint(owner, tokenId);
  }

  function getCertificateData(uint256 tokenId)
    public
    view
    returns (uint256, uint256)
  {
    require(_exists(tokenId), "Certificate: Token ID does not exist");

    CertificateData memory data = certificates[tokenId];
    return (data.artworkId, data.issueDate);
  }

  function _beforeTokenTransfer(
    address,
    address,
    uint256
  ) internal pure override {
    revert("Certificate: NFT is non-transferable");
  }
}
