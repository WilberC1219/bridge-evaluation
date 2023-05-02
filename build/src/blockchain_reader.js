"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainReader = void 0;
const ethers_1 = require("ethers");
class BlockchainReader {
    constructor(providerUrl) {
        this.provider = ethers_1.ethers.getDefaultProvider(providerUrl);
    }
    getLatestBlockNumber() {
        return this.provider.getBlockNumber();
    }
    getTransactionReceipt(transactionHash) {
        return this.provider.getTransactionReceipt(transactionHash);
    }
    getBlock(blockNumber) {
        return this.provider.getBlock(blockNumber);
    }
    listenToBlockHeaders(eventHandler) {
        this.provider.on("block", eventHandler);
    }
    getEvents(fromBlock, toBlock, eventTopics, addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.provider.getLogs({
                topics: eventTopics,
                address: addresses,
                fromBlock: fromBlock,
                toBlock: toBlock ? toBlock : "latest",
            });
        });
    }
    getContract(address, abi) {
        return new ethers_1.ethers.Contract(address, abi, this.provider);
    }
}
exports.BlockchainReader = BlockchainReader;
