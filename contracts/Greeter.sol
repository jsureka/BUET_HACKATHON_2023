//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    address private _owner;

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not an owner");
        _;
    }

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        _owner = msg.sender;
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public onlyOwner payable{
        require(msg.value > 10000, "Not enough paid");
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function getOwner() public view returns(address) {
        return _owner;
    }
}