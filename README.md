# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Beekeeper (Seller), a MarketPlace, a courier and a Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...

![truffle test](images/ftc_product_overview.png)

![truffle test](images/ftc_farm_details.png)

![truffle test](images/ftc_product_details.png)

![truffle test](images/ftc_transaction_history.png)

## Project write-up 
### UML
![truffle test](UML/Activity_v3.png)

![truffle test](UML/Sequence_v3.png)

![truffle test](UML/State_v3.png)

![truffle test](UML/Class_v3.png)

### Libraries
No external libraries have been used. Frameworks version:
- Truffle v4.1.15 - a development framework for Ethereum
- Node v10.13.0
- Ganache CLI v6.4.5 (ganache-core: 2.5.7)

## Part 2: Write smart contracts
In order to create your supply chain DApp, you will need to properly manage user permissions and track a product’s authenticity.

The smart contract(s) you build should have these requirements:

###  Requirement 1 	Define and implement interfaces: 
Review all the files. Add in any interfaces you use. 

### Requirement 2 	Build out AccessControl Contracts: Build out these contracts so that each actor’s role in your supply chain is distinct with no overlap in their access abilities. 
The Following contracts were created, inheriting from Role.sol:  
    BeekeeperRole.sol (already existed as FarmerRole.sol): The Beekeeper can create new hives through division or capture, feed and monitor them until ready for shipping, advertise them and track authenticity.
    ConsumerRole.sol: The Consumer can buy hives and track authenticity.
    CourierRole.sol: The Courier can deliver itens and track authenticity.
    MarketPlaceRole.sol: The MarketPlace can announce and sell hives and track authenticity
   
### Requirement 3 	Build out Base Contract
    Base - SupplyChain.sol: This is where we define the most fundamental code shared throughout the core functionality. This includes our main data storage, constants and data types, plus internal functions for managing these items.

### Requirement 4 	Build out Core Contract
    Core - Ownable.sol: is the contract that controls ownership and transfer of ownership.

## Part 3: Test smart contract code coverage
Requirement: Smart contract has associated tests

At minimum, test every function for every function you implemented from your Sequence Diagram. For example, from this Sequence Diagram we would need to test 10 functions:

    harvestItem()
    processItem()
    packItem()
    addItem()
    buyItem()
    shiptItem()
    receiveItem()
    purchaseItem()
    fetchItemBufferOne()
    fetchItemBufferTwo()

![truffle test](UML/Sequence_v3.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
Give examples (to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/anmi404/project-6/
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

![truffle test](images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

## Authors

See also the list of [contributors](https://github.com/anmi404/project-6/contributors.md) who participated in this project.

## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
