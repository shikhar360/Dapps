// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

error NotEnouthETH();

contract Casino {
    //States
    uint256 private immutable i_entranceFees;
    address payable[] private s_players;

    // Events
    event EnteredGame(address indexed player);

    constructor(uint entranceFee) {
        i_entranceFees = entranceFee;
    }

    function enterPlayers() public payable {
        if (msg.value < i_entranceFees) {
            revert NotEnouthETH();
        }

        s_players.push(payable(msg.sender));
        //emit an event when we change the dynamic array
        emit EnteredGame(msg.sender);
    }

    function randomWinner() public {}

    function getEntryFees() external view returns (uint256) {
        return i_entranceFees;
    }

    function getPlayers(uint256 i) external view returns (address) {
        return s_players[i];
    }
}
