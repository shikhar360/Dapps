//SPDX-License-Identifier: Unlicense

// solhint-disable-next-line
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "hardhat/console.sol";

contract CandyMachine{

  
  address payable public owner;
  mapping(address => uint) private candyBalance ;


  constructor(){
    owner = payable(msg.sender);
    candyBalance[address(this)] = 100 ; 
  }
  
 

  function buyCandy(uint _amount)external payable {
    // msg.value contains the amount of wei (ether / 1e18) sent in the transaction.
    require(msg.value >= _amount * 0.01 ether , "Send more eth to buy it");
    require(candyBalance[address(this)] >= _amount , "Not enought candy left " );
   candyBalance[address(this)] -= _amount ;
   candyBalance[address(msg.sender)]  += _amount ;  
   

  }
  
  function getCandyBalance()external view returns(uint){
    return candyBalance[address(this)];
  }

  modifier onlyOwner(){
    require(owner == msg.sender , "You are not the Owner");
    _;
  }

  function restock(uint _amount) external onlyOwner {
   candyBalance[address(this)] += _amount ;
  }

  function totalPurchasedByAddress(address _addr) external view returns(uint){
    return candyBalance[_addr] ;
  }

  function withdrawFunds(uint _amount) external  onlyOwner{
    require( address(this).balance >= _amount  , "Withdrawing more than sale");
    payable(msg.sender).transfer( _amount );
     
  } 

 function getEarnings()external view returns(uint){
   return address(this).balance;
 }
}