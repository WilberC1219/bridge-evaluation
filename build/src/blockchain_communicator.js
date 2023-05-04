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
exports.BlockchainCommunicator = void 0;
const blockchain_reader_1 = require("./blockchain_reader");
const blockchain_writer_1 = require("./blockchain_writer");
class BlockchainCommunicator {
    constructor(walletPrivateEnvKey, providerUrl) {
        this.reader = new blockchain_reader_1.BlockchainReader(providerUrl);
        this.writer = new blockchain_writer_1.BlockchainWriter(walletPrivateEnvKey, providerUrl);
    }
    getReader() {
        return this.reader;
    }
    getWriter() {
        return this.writer;
    }
    getLatestBlockNumber() {
        return this.reader.getLatestBlockNumber();
    }
    getTransactionReceipt(transactionHash) {
        return this.reader.getTransactionReceipt(transactionHash);
    }
    listenToBlockHeaders(eventHandler) {
        this.reader.listenToBlockHeaders(eventHandler);
    }
    getEvents(fromBlock, toBlock, eventTopics, addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reader.getEvents(fromBlock, toBlock, eventTopics, addresses);
        });
    }
    getContract(address, abi) {
        return this.reader.getContract(address, abi);
    }
    submitTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.writer.submitTransaction(transaction);
        });
    }
}
exports.BlockchainCommunicator = BlockchainCommunicator;
