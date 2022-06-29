// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract WavePortal{
  uint256 totalWaves;
  address public owner;
  uint256 private seed;



  event RepliesComment(address indexed from , uint256 timeStamp , string message ); // event is a cheaper way to store data on a blockchain , we write event name of event and pass the types
  //there are 2 parts of it firs one is event and second is `emit` we can not read the emit logs in a smart contraact
  // there is also indexed keyword which means that someone could seach usiing the address.


//  here object is created
  struct Wave{       //in order to store the data we will apply the pattern ARRAY OF OBJECTS , 
   address waver;    
   string message;
   uint256 timestamp;

  }
 
 // ARRAY is created to store the object
  Wave[] waves;


  mapping(address => uint256) public lastWaveAt;


  constructor()payable{ // beacuse we want to pay the wavers                    // anonymous function
    console.log("Yo , I am a smart contract");    // hardhat features,  use to debug the contract 
    owner = msg.sender;

    seed = (block.timestamp + block.difficulty)%100; // it generates the seed for the current user / initial seed
  }
  


  function wave(string memory _message) public {

   //checking if aa user wont send a message again under 15 mins

   require( lastWaveAt[msg.sender] + 30 seconds < block.timestamp , "wait 15 minutes bro");
   
   lastWaveAt[msg.sender] = block.timestamp; //updating the current timestamp



   totalWaves += 1;
    console.log('Hey you just waved to me' , msg.sender); //msg.sender is the address who calls the function
  
    waves.push(Wave(msg.sender , _message , block.timestamp)); // pushing wave struct into waves array




    seed = (block.difficulty + block.timestamp + seed) % 100; // it generates random seed for the next user 

        console.log("Random # generated: %d", seed); //displaying random seed

     if(seed <=50){  // now user have 50% chance of winning the prize
 
    // setting a prize amount so everyone who wave to us will get 0.0001 ether as a prize
      uint256 priceAmount = 0.0001 ether;

      require( priceAmount <= address(this).balance , 'Not enough money to send Price Amount'); //sasta ifelse

      (bool success,) = (msg.sender).call{value : priceAmount}(''); 

      require(success , "Failed to transfer the prize amount"); // if valuee transfered then success else the statement

    }


    emit RepliesComment(msg.sender , block.timestamp, _message); //emmiting the event , we will not be able to what is emmited because it is not stored on a blockchain 

  }


  function getWaves() public view returns (Wave[] memory){
    return waves;
  }

  function getTotalWavesCount() public view returns (uint256){
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }

}





