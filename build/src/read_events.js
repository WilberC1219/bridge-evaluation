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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadEvent = void 0;
const ethers_1 = require("ethers");
const erc20_abi_json_1 = require("../resources/erc20.abi.json");
const async_retry_1 = __importDefault(require("async-retry"));
const retryOptions = {
    retries: 10,
    factor: 2,
    minTimeout: 3000,
    maxTimeout: 60000,
    randomize: true, // Randomize the wait time
};
/**
 * readEvent function. retrieves a list of transfer events from and to Stargate.
 */
class ReadEvent {
    constructor(reader, db_interact) {
        //returns Transaction receipt for a given transactioNhash
        this.transactionReceipt = (transactionHash) => __awaiter(this, void 0, void 0, function* () {
            const receipt = yield this.blockchain_reader.getTransactionReceipt(transactionHash);
            if (!receipt) {
                console.error("HTTP error 429: Too Many Requests, retrying...");
                throw new Error("HTTP error 429: Too Many Requests, retrying...");
            }
            return receipt;
        });
        //returns block for a given blockNumber
        this.block_ = (blockNumber) => __awaiter(this, void 0, void 0, function* () {
            const block = yield this.blockchain_reader.getBlock(blockNumber);
            if (!block) {
                console.error("HTTP error 429: Too Many Requests, retrying...");
                throw new Error("HTTP error 429: Too Many Requests, retrying...");
            }
            return block;
        });
        this.blockchain_reader = reader;
        this.db_interact = db_interact;
    }
    readEvent(eventSignature, fromBlock, toBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            // convert event signature to keccak256 hash.
            const eventHexStr = ethers_1.ethers.keccak256(ethers_1.ethers.toUtf8Bytes(eventSignature));
            const stargateHexStr = ethers_1.ethers.AbiCoder.defaultAbiCoder().encode(["address"], ["0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"]);
            const topics = [eventHexStr, stargateHexStr]; //hardcoded the starget router address
            const events = yield this.blockchain_reader.getEvents(fromBlock, toBlock, topics, [
                "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            ]);
            const num_events = events.length;
            yield this.parseLogBlocked(events);
            return num_events;
        });
    }
    /** forEach VERSION (does not wait for each transaction details object to be created before moving onto the next)
     * function used to decode the encoded Logs and store the necessary data into
     * The database.
     */
    parseLog(logs) {
        return __awaiter(this, void 0, void 0, function* () {
            const abiObj = new ethers_1.ethers.Interface(erc20_abi_json_1.abi);
            const promises = logs.map((log) => __awaiter(this, void 0, void 0, function* () {
                const decoded = abiObj.parseLog({ topics: log.topics, data: log.data });
                const usdcAmt = decoded ? decoded.args[2] : -1;
                const details = {
                    transactionHash: log.transactionHash,
                    transferAmount: usdcAmt,
                    blockNumber: log.blockNumber,
                    gasPrice: BigInt(-1),
                    gasUsed: BigInt(-1),
                    timestamp: -1,
                };
                const receipt = yield (0, async_retry_1.default)(() => this.transactionReceipt(log.transactionHash), retryOptions);
                const block = yield (0, async_retry_1.default)(() => this.block_(log.blockNumber), retryOptions);
                details.gasPrice = receipt.gasPrice;
                details.gasUsed = receipt.gasUsed;
                details.timestamp = block.timestamp;
                //save into the database
                yield this.db_interact.saveTransactioninfo(details);
            }));
            yield Promise.all(promises);
        });
    }
    /** for loop VERSION (waits for each transaction details object to be create before moving onto the next)
     * function used to decode the encoded Logs and store the necessary data into
     * The database.
     */
    parseLogBlocked(logs) {
        return __awaiter(this, void 0, void 0, function* () {
            const abiObj = new ethers_1.ethers.Interface(erc20_abi_json_1.abi);
            for (const log of logs) {
                const decoded = abiObj.parseLog({ topics: log.topics, data: log.data });
                const usdcAmt = decoded ? decoded.args[2] : -1;
                try {
                    const details = {
                        transactionHash: log.transactionHash,
                        transferAmount: usdcAmt,
                        blockNumber: log.blockNumber,
                        gasPrice: -BigInt(1),
                        gasUsed: -BigInt(1),
                        timestamp: -1,
                    };
                    const receipt = yield this.transactionReceipt(log.transactionHash);
                    const block = yield this.block_(log.blockNumber);
                    details.gasPrice = receipt.gasPrice;
                    details.gasUsed = receipt.gasUsed;
                    details.timestamp = block.timestamp;
                    //save into database
                    yield this.db_interact.saveTransactioninfo(details);
                }
                catch (error) {
                    console.error(error);
                    throw new Error(`${error}`);
                }
            }
        });
    }
}
exports.ReadEvent = ReadEvent;
