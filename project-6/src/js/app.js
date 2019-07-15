//import Web3 from "web3";
//var Web3 = require("web3");
//var ethJSABI = require("ethjs-abi");
//var BlockchainUtils = require("truffle-blockchain-utils");

App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x09cA62860d3a215e8999d9eD76306899ec0d42f5",
    ownerID: "0x09cA62860d3a215e8999d9eD76306899ec0d42f5",
    originFarmerID: "0x09cA62860d3a215e8999d9eD76306899ec0d42f5",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    MarketPlaceID: "0x9C5073E861405C8F2C3Afc9932bC026310012F41",
    CourierID: "0x63A59Dd1594F866eA763aFf8DDc3101955A0Df66",
    consumerID: "0x28D1515a897BDC5212b79CD614C805740d02acF5",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.MarketPlaceID = $("#MarketPlaceID").val();
        App.CourierID = $("#CourierID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.MarketPlaceID, 
            App.CourierID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts

        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err.message);
                return;
            }
            console.log('metamaskAccountID:',res);
            App.metamaskAccountID = res[0];
            //App.MarketPlaceID = res[1];
            //App.CourierID = res[2];
            //App.consumerID = res[3];

        })      
    },
//0x09cA62860d3a215e8999d9eD76306899ec0d42f5 - a14f4190d0d2a78900b123ec5893ddb9e28056c74bea8ac2d211113ebc3e33b1    
//0x28D1515a897BDC5212b79CD614C805740d02acF5 - b18caa840c5be0445e9a86ec097c86702103fb058054dacad1e5a2cc5ac5e438    
//0x27D8D15CbC94527cAdf5eC14B69519aE23288B95 - 9137dc4de37d28802ff9e5ee3fe982f1ca2e5faa52f54a00a6023f546b23e779    
//0x018C2daBef4904ECbd7118350A0c54DbeaE3549A - 18911376efeff48444d1323178bc9f5319686b754845e53eb1b777e08949ee9b
//0xCe5144391B4aB80668965F2Cc4f2CC102380Ef0A - f948c5bb8b54d25b2060b5b19967f50f07dc388d6a5dada56e5904561e19f08b
//0x460c31107DD048e34971E57DA2F99f659Add4f02 - fad19151620a352ab90e5f9c9f4282e89e1fe32e070f2c618e7bc9f6d0d236fb
//thing beauty giggle lonely choice blind test era parent balcony menu napkin

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        console.log('handleButtonClick');
        web3 = new Web3(App.web3Provider);

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.createItem(event);
                break;
            case 2:
                return await App.HiveReady(event);
                break;
            case 3:
                return await App.advertiseItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.packItem(event);
                break;
            case 7:
                return await App.shipItem(event);
                break;
            case 8:
                return await App.receiveItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            }
    },

    createItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.createItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('createItem',result);
        }).catch(function(err) {
            console.log('createItem err ',err.message);
        });
    },

    HiveReady: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.HiveReady(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('HiveReady',result);
        }).catch(function(err) {
            console.log('HiveReady err ', err.message);
        });
    },

    advertiseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        //const _MarketPlaceID = document.getElementById("MarketPlaceID").value;
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.advertiseItem(App.upc, App.metamaskAccountID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('advertiseItem',result);
        }).catch(function(err) {
            console.log(err.message, App.upc, App.MarketPlaceID);
        });
    },
    
    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.toWei(0.5, "ether");
            console.log('productPrice',App.productPrice);
            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sellItem',result);
        }).catch(function(err) {
            console.log('sellItem err ',err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log('buyItem err ',err.message);
        });
    },

    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        //const _CourierID = document.getElementById("CourierID").value;


        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, App.metamaskAccountID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packItem',result);
        }).catch(function(err) {
            console.log('packItem ', err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipItem',result);
        }).catch(function(err) {
            console.log('shipItem  ', err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log('receiveItem', err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);

        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
