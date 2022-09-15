// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    address internal owner;
    string internal mood;

    constructor() {
        owner = msg.sender;
    }

    function setMood(string memory _mood) external {
        mood = _mood;
    }

    function getMood() external view returns (string memory) {
        return mood;
    }
}
