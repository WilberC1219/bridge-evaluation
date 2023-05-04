"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
var Blockchain;
(function (Blockchain) {
    Blockchain["ETHEREUM"] = "ethereum";
    Blockchain["POLYGON"] = "polygon";
    Blockchain["BINANCE"] = "binance";
    Blockchain["ARBITRUM_ONE"] = "arbitrum_one";
    Blockchain["ARBITRUM_NOVA"] = "arbitrum_nova";
    Blockchain["OPTIMISM"] = "optimism";
    Blockchain["EVMOS"] = "evmos";
    Blockchain["MOONBEAM"] = "moonbeam";
    // testnets
    Blockchain["ETHEREUM_GOERLI"] = "ethereum_goerli";
    Blockchain["ARBITRUM_NITRO_GOERLI"] = "arbitrum_nitro_goerli";
    Blockchain["OPTIMISM_GOERLI"] = "optimism_goerli";
    Blockchain["POLYGON_MUMBAI"] = "polygon_mumbai";
    // local testing
    Blockchain["HARDHAT"] = "hardhat";
})(Blockchain = exports.Blockchain || (exports.Blockchain = {}));
