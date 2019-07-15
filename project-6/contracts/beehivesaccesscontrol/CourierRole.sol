pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'CourierRole' to manage this role - add, remove, check
contract CourierRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event CourierAdded(address indexed account);
  event CourierRemoved (address indexed account);

  // Define a struct 'Couriers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Couriers;

  // In the constructor make the address that deploys this contract the 1st Courier
  constructor() public {
    _addCourier(msg.sender);  
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyCourier() {
    require (isCourier(msg.sender));
    _;
  }

  // Define a function 'isCourier' to check this role
  function isCourier(address account) public view returns (bool) {
    return Couriers.has(account);
  }

  // Define a function 'addCourier' that adds this role
  function addCourier(address account) public onlyCourier {
    _addCourier(account);
  }

  // Define a function 'renounceCourier' to renounce this role
  function renounceCourier() public {
    _removeCourier(msg.sender);
  }

  // Define an internal function '_addCourier' to add this role, called by 'addCourier'
  function _addCourier(address account) internal {
    Couriers.add(account);
    emit CourierAdded(account);
  }

  // Define an internal function '_removeCourier' to remove this role, called by 'removeCourier'
  function _removeCourier(address account) internal {
    Couriers.add(account);
    emit CourierRemoved(account);
  }
}