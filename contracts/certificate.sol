// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Certificate is ERC721, Ownable {
    uint256 private tokenIdCounter;

    struct CertificateData {
        uint256 artworkId;
        uint256 issueDate;
    }

    address payable verifier;
    mapping(uint256 => CertificateData) private certificates;
    mapping(uint256 => string) private tokenURIs;

    constructor() ERC721("Certificate", "CERT") {
        tokenIdCounter = 1;
        verifier = payable(msg.sender);
    }

    function issueCertificate(
        uint256 artworkId,
        uint256 issueDate,
        string memory newTokenURI
    ) external onlyOwner {
        uint256 tokenId = tokenIdCounter;
        tokenIdCounter++;

        certificates[tokenId] = CertificateData(artworkId, issueDate);
        tokenURIs[tokenId] = newTokenURI;

        _mint(verifier, tokenId);
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

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Certificate: Token ID does not exist");

        return tokenURIs[tokenId];
    }

    function _beforeTokenTransfer(
        address,
        address,
        uint256
    ) internal pure {
        revert("Certificate: NFT is non-transferable");
    }
}
