// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract supplyChain is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _certificateTokenIds;
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
    uint256 price;
    uint256 quantity;
    address creator;
    bool isVerified;
    string tokenURI;
    bool isPremium;
    uint256 certificateId;
    uint256 deadline;
    Bid highestBid;
  }

  struct CertificateData {
    uint256 artworkId;
    address creator;
    uint256 issueDate;
  }

  // Enum to represent delivery status
  enum DeliveryStatus {
    NotDelivered,
    Delivered,
    Received
  }

  // Mapping to store artworks by their ID
  mapping(uint256 => Artwork) public artworks;
  uint256 public totalArtworks;

  // Mapping to store the authenticity certificate for each artwork
  mapping(uint256 => address) public artworkCertificates;

  // Mapping to store the orders by their ID
  mapping(uint256 => Order) public orders;
  uint256 public totalOrders;

  // Struct to represent an order
  struct Order {
    uint256 id;
    uint256 artworkId;
    address buyer;
    DeliveryStatus deliveryStatus;
  }

  // Struct to represent a bid
  struct Bid {
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

  modifier isVerified(uint256 artworkId) {
    require(
      artworks[artworkId].isVerified == true,
      "This artwork is already verified"
    );
    _;
  }

  function addArtwork(
    string memory description,
    uint256 price,
    uint256 quantity,
    string memory tokenURI,
    uint256 certificateId,
    uint256 deadline
  ) external {
    require(quantity > 0, "Quantity must be greater than 0");
    totalArtworks++;
    artworks[totalArtworks].id = totalArtworks;
    artworks[totalArtworks].description = description;
    artworks[totalArtworks].price = price;
    artworks[totalArtworks].quantity = quantity;
    artworks[totalArtworks].creator = msg.sender;
    artworks[totalArtworks].tokenURI = tokenURI;
    artworks[totalArtworks].deadline = deadline;
    artworks[totalArtworks].certificateId = certificateId;
    if (deadline > 0) {
      artworks[totalArtworks].isPremium = true;
    }
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
    require(
      msg.sender != artworks[artworkId].creator,
      "Product creator cannot buy"
    );
    require(artworks[artworkId].certificateId != 0, "Artwork is not verified");
    require(artworks[artworkId].quantity > 0, "Product out of stock");
    (bool sent, ) = payable(artworks[artworkId].creator).call{
      value: msg.value
    }("");
    if (artworks[artworkId].certificateId > 0) {
      (bool sent, ) = payable(
        certificates[artworks[artworkId].certificateId].creator
      ).call{ value: (artworks[artworkId].price * 2) / 100 }("");
    }
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

  //Confirm receiving the order
  function confirmOrderReception(uint256 orderId)
    external
    payable
    orderExists(orderId)
  {
    Order storage order = orders[orderId];
    require(
      msg.value == (artworks[orders[orderId].artworkId].price * 9) / 10,
      "Incorrect payment amount"
    );
    require(
      order.buyer == msg.sender,
      "Only the buyer can confirm order reception"
    );
    (bool sent, ) = payable(artworks[orders[orderId].artworkId].creator).call{
      value: msg.value
    }("");
    order.deliveryStatus = DeliveryStatus.Received;
    emit OrderConfirmed(orderId);
  }

  //get verified artworks for buyer
  function getAllArtworks() public view returns (Artwork[] memory) {
    Artwork[] memory allArtworks = new Artwork[](totalArtworks);
    uint256 index = 0;
    for (uint256 i = 1; i <= totalArtworks; i++) {
      allArtworks[index] = artworks[i];
      index++;
    }

    return allArtworks;
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

  //Place a bid in the auction
  function placeBid(uint256 artworkId)
    external
    payable
    artworkExists(artworkId)
  {
    require(msg.value > 0, "Bid amount must be greater than 0");
    require(
      artworks[artworkId].deadline > block.timestamp,
      "Bidding deadline has passed"
    );
    if (artworks[artworkId].highestBid.amount < msg.value) {
      (bool sent, ) = payable(artworks[artworkId].highestBid.bidder).call{
        value: artworks[artworkId].highestBid.amount
      }("");
      artworks[artworkId].highestBid = Bid(msg.sender, msg.value);
    }

    emit BidPlaced(artworkId);
  }

  function endAuction(uint256 artworkId) external artworkExists(artworkId) {
    require(
      artworks[artworkId].deadline < block.timestamp,
      "Bidding deadline has not passed"
    );
    // only highest bidder can end the auction
    require(
      artworks[artworkId].highestBid.bidder == msg.sender,
      "Only highest bidder can end the auction"
    );
    (bool sent, ) = payable(artworks[artworkId].creator).call{
      value: artworks[artworkId].highestBid.amount
    }("");
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

  // verify certificate
  function issueCertificate(
    uint256 artworkId,
    uint256 issueDate,
    string memory tokenURI
  ) external onlyVerifier(artworkId) returns (uint256) {
    _certificateTokenIds.increment();
    uint256 tokenId = _certificateTokenIds.current();
    certificates[tokenId] = CertificateData(
      artworkId,
      artworks[artworkId].creator,
      issueDate
    );
    artworks[artworkId].certificateId = tokenId;
    artworks[artworkId].isVerified = true;
    tokenURIs[tokenId] = tokenURI;

    _safeMint(owner, tokenId);
    _setTokenURI(tokenId, tokenURI);

    return tokenId;
  }

  function getCertificateData(uint256 tokenId)
    public
    view
    returns (
      uint256,
      address,
      uint256
    )
  {
    require(_exists(tokenId), "Certificate: Token ID does not exist");

    CertificateData memory data = certificates[tokenId];
    return (data.artworkId, data.creator, data.issueDate);
  }
}
