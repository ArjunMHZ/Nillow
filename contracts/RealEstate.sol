// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RealEstate is ERC721 {
    uint256 private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("Real Estate", "REAL") {}

    function mint(string memory uri) external returns (uint256 tokenId) {
        _tokenIds += 1;
        tokenId = _tokenIds;

        _mint(msg.sender, tokenId);
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI( uint256 tokenId ) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIds;
    }
}
