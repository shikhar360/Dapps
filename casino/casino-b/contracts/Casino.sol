// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
/*
In order to use the Chainlink VrF we need to import two contracts  (above 2 ) followed by the 

 yarn add @chainlink/contracts

 in order to gain the access  to the contracts....
 Before creating subscription we need to set the variables

 after defining the listed vcariable we need to initiate it in the constructor

After initiating the Variables we need to define two functions 
1. Function that will request random words (numbers) can be of any name 
2. fulfillRandomWords (case-specific) The function in which the random number is can be set to a variable/
anything.

.
.
.
.
..
.
After that we have to create a subscription on the chainlink website

 Follow this link to create subscription
 https://docs.chain.link/docs/vrf/v2/examples/get-a-random-number/
 https://www.youtube.com/watch?v=rdJ5d8j1RCg


 */

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

/*
Chainlink Keepers are used to automate the contract (like We want to do things after a certain interval of time )

These contracts look for 2 functions (case-sensitive)
1. checkUpkeep  (In checkUpkeep they specifically look for the upkeepNeeded)

2. performUpkeep
.
.
.
.
.
.
.
.
Links:

https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/
https://www.youtube.com/watch?v=-Wkw5JVQGUo

 */

error NotEnouthETH();
error TRANSFER__FAILED();
error NotOpenToEnter();
error NoUpkeepNeeded();

contract Casino is VRFConsumerBaseV2 {
    //Types
    enum CasinoState {
        OPEN,
        CALCULATING
    }

    //States
    uint256 private immutable i_entranceFees;
    address payable[] private s_players;

    /* Variables defined for Chainlink Vrf */
    VRFCoordinatorV2Interface private immutable i_coordinator;
    bytes32 private immutable i_gaslane;
    uint64 private immutable i_subscription;
    uint32 private immutable i_gasLimit;
    uint16 private constant CONFIRMTIONREQ = 3;
    uint32 private constant NUM_WORDS = 1;
    ///////////////////////////////////////////////////////////

    // Casino function variable;
    address private s_recentWinner;
    CasinoState private s_currentState;
    uint256 private s_lastTimestamp;
    uint256 private immutable i_interval;
    // Events
    event EnteredGame(address indexed player);
    event RequestedCasinoWinner(uint256 indexed requestedWinnerId);
    event WinnerPicked(address indexed winner);

    constructor(
        address vrfCoordinator, // Initiating the VRF variables
        uint entranceFee,
        bytes32 gaslane,
        uint64 subscription,
        uint32 gasLimit,
        uint256 interval
    ) VRFConsumerBaseV2(vrfCoordinator) {
        i_entranceFees = entranceFee;
        i_coordinator = VRFCoordinatorV2Interface(vrfCoordinator);
        i_gaslane = gaslane;
        i_subscription = subscription;
        i_gasLimit = gasLimit;
        s_currentState = CasinoState.OPEN;
        s_lastTimestamp = block.timestamp;
        i_interval = interval;
    }

    function enterPlayers() public payable {
        if (msg.value < i_entranceFees) {
            revert NotEnouthETH();
        }

        if (s_currentState != CasinoState.OPEN) {
            revert NotOpenToEnter();
        }
        s_players.push(payable(msg.sender));
        //emit an event when we change the dynamic array
        emit EnteredGame(msg.sender);
    }

    /**
     * @dev
     * Following things need to be in consideration
     * Should have time Interval
     * should have atleast 1 player
     * our subscription funded with link
     * casino should be in open state
     *
     */
    function checkUpkeep(
        bytes memory /*checkData */
    )
        public
        returns (
            bool upkeepNeeded //  , bytes memory /*performData */
        )
    {
        bool isOpen = (CasinoState.OPEN == s_currentState);
        bool timepassed = (block.timestamp - s_lastTimestamp) >= i_interval;
        bool hasPlayers = s_players.length > 0;
        bool hasBalance = address(this).balance > 0;
        upkeepNeeded = (isOpen && timepassed && hasPlayers && hasBalance); // important
    }

    /*requestRandomWinner*/
    function performUpkeep(
        bytes calldata /*performData */
    ) external {
        bool upkeepNeeded = checkUpkeep("");
        if (!upkeepNeeded) {
            revert NoUpkeepNeeded();
        }
        s_currentState = CasinoState.CALCULATING;
        uint256 requestID = i_coordinator.requestRandomWords( // For Requesting the random words
            i_gaslane,
            i_subscription,
            CONFIRMTIONREQ,
            i_gasLimit,
            NUM_WORDS
        );
        emit RequestedCasinoWinner(requestID);
    }

    function fulfillRandomWords(
        uint256, /*reqID*/ // commented bc its is never used so it doesnt give any warning
        uint256[] memory randomWords
    ) internal override {
        uint256 indexOf = randomWords[0] % s_players.length; //no. of randopm words getting
        address payable recentWinner = s_players[indexOf];
        s_recentWinner = recentWinner;
        s_currentState = CasinoState.OPEN;
        s_players = new address payable[](0); //resetting the address apyable array
        s_lastTimestamp = block.timestamp;
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        if (!success) {
            revert TRANSFER__FAILED();
        }
        emit WinnerPicked(recentWinner);
    }

    function getEntryFees() external view returns (uint256) {
        return i_entranceFees;
    }

    function getPlayers(uint256 i) external view returns (address) {
        return s_players[i];
    }

    function getRecentWinner() external view returns (address) {
        return s_recentWinner;
    }

    function getCasinoState() external view returns (CasinoState) {
        return s_currentState;
    }

    function getNumWords() external pure returns (uint256) {
        // constants can be viewed as pure function
        return NUM_WORDS;
    }

    function getNumOfPlayers() external view returns (uint256) {
        return s_players.length;
    }

    function getTimestamp() external view returns (uint256) {
        return s_lastTimestamp;
    }
}
