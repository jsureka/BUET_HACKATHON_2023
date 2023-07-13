// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ArtworkMarketplace is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;

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
    bool isVerified;
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
    DeliveryStatus deliveryStatus;
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
  event OrderDeliveryStatusUpdated(uint256 id, DeliveryStatus status);
  event OrderPlaced(uint256 id);
  event OrderConfirmed(uint256 id);
  event BidPlaced(uint256 id);

  // Modifier to check if the caller is the artwork creator
  modifier onlyCreator(uint256 artworkId, address creator) {
    require(
      creator == artworks[artworkId].creator,
      "Only the artwork creator can perform this action"
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
    uint256 quantity,
    string memory tokenURI
  ) external payable {
    require(quantity > 0, "Quantity must be greater than 0");

    // _tokenIds.increment();
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

    emit ArtworkAdded(totalArtworks);
  }

  // Update the quantity of an artwork
  function updateArtworkQuantity(
    uint256 artworkId,
    uint256 quantity,
    address creator
  ) external onlyCreator(artworkId, creator) artworkExists(artworkId) {
    artworks[artworkId].quantity = quantity;
    emit ArtworkQuantityUpdated(artworkId, quantity);
  }

  //get artworks by a creator
  function getArtworksByCreator() public view returns (Artwork[] memory) {
    uint256 artworksCount = 0;
    for (uint256 i = 1; i <= totalArtworks; i++) {
      if (artworks[i].creator == msg.sender) {
        artworksCount++;
      }
    }
    Artwork[] memory creatorArtworks = new Artwork[](artworksCount);
    uint256 index = 0;

    for (uint256 i = 1; i <= totalArtworks && index < artworksCount; i++) {
      if (artworks[i].creator == msg.sender) {
        creatorArtworks[index++] = artworks[i];
      }
    }

    return creatorArtworks;
  }

  function getOrdersByCreator() public view returns (Order[] memory) {
    uint256 ordersCount = 0;

    for (uint256 i = 1; i <= totalOrders; i++) {
      if (artworks[orders[i].artworkId].creator == msg.sender) {
        ordersCount++;
      }
    }
    Order[] memory creatorOrders = new Order[](ordersCount);
    uint256 index = 0;

    for (uint256 i = 1; i <= totalOrders && index < ordersCount; i++) {
      if (artworks[orders[i].artworkId].creator == msg.sender) {
        creatorOrders[index++] = orders[i];
      }
    }
    return creatorOrders;
  }

  // Update the delivery status of an artwork
  function updateOrderDeliveryStatus(uint256 orderId, DeliveryStatus status)
    external
    orderExists(orderId)
  {
    orders[orderId].deliveryStatus = status;
    emit OrderDeliveryStatusUpdated(orderId, status);
  }

  // Place an order for an artwork
  function placeOrder(uint256 artworkId)
    public
    payable
    artworkExists(artworkId)
  {
    require(
      msg.value == artworks[artworkId].price / 10,
      "Incorrect payment amount"
    );
    require(artworks[artworkId].quantity > 0, "Product out of stock");
    artworks[artworkId].quantity--;
    totalOrders++;
    orders[totalOrders] = Order(
      totalOrders,
      artworkId,
      msg.sender,
      DeliveryStatus.NotDelivered
    );
    emit OrderPlaced(totalOrders);
  }

  //get verified artworks for buyer
  function getVerifiedArtworks() public view returns (Artwork[] memory) {
    uint256 verifiedCount = 0;
    for (uint256 i = 1; i <= totalArtworks; i++) {
      if (artworks[i].isVerified) {
        verifiedCount++;
      }
    }
    Artwork[] memory verifiedArtworks = new Artwork[](verifiedCount);
    uint256 index = 0;
    for (uint256 i = 1; i <= totalArtworks; i++) {
      if (artworks[i].isVerified) {
        verifiedArtworks[index] = artworks[i];
        index++;
      }
    }

    return verifiedArtworks;
  }

  //get placed orders of buyers
  function getOrdersByBuyer(address buyer)
    public
    view
    returns (Order[] memory)
  {
    uint256 buyerOrdersCount = 0;
    for (uint256 i = 1; i <= totalOrders; i++) {
      if (orders[i].buyer == buyer) {
        buyerOrdersCount++;
      }
    }
    Order[] memory buyerOrders = new Order[](buyerOrdersCount);
    uint256 index = 0;
    for (uint256 i = 1; i <= totalOrders; i++) {
      if (orders[i].buyer == buyer) {
        buyerOrders[index] = orders[i];
        index++;
      }
    }

    return buyerOrders;
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
  function verifyCertificate(uint256 artworkId, address certificate)
    external
    artworkExists(artworkId)
    isVerified(artworkId)
  {
    artworkCertificates[artworkId] = certificate;
  }

  // Check the authenticity certificate for an artwork
  function checkCertificate(uint256 artworkId) external view returns (address) {
    return artworkCertificates[artworkId];
  }
}
