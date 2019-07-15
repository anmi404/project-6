pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'MarketPlaceRole' to manage this role - add, remove, check
contract MarketPlaceRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event MarketPlaceAdded(address indexed account);
  event MarketPlaceRemoved(address indexed account);

  // Define a struct 'MarketPlaces' by inheriting from 'Roles' library, struct Role
  Roles.Role private MarketPlaces;

  // In the constructor make the address that deploys this contract the 1st MarketPlace
  constructor() public {
    _addMarketPlace(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyMarketPlace() {
    require (isMarketPlace(msg.sender));
    _;
  }

  // Define a function 'isMarketPlace' to check this role
  function isMarketPlace(address account) public view returns (bool) {
    return MarketPlaces.has(account);
  }

  // Define a function 'addMarketPlace' that adds this role
  function addMarketPlace(address account) public onlyMarketPlace {
    _addMarketPlace(account);
  }

  // Define a function 'renounceMarketPlace' to renounce this role
  function renounceMarketPlace() public {
    _removeMarketPlace(msg.sender);
  }

  // Define an internal function '_addMarketPlace' to add this role, called by 'addMarketPlace'
  function _addMarketPlace(address account) internal {
    MarketPlaces.add(account);
    emit MarketPlaceAdded(account);
  }

  // Define an internal function '_removeMarketPlace' to remove this role, called by 'removeMarketPlace'
  function _removeMarketPlace(address account) internal {
    MarketPlaces.remove(account);
    emit MarketPlaceRemoved(account);
  }
}