"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.readEvent = void 0;
const blockchain_reader_1 = require("./blockchain_reader");
const ethers_1 = require("ethers");
const erc20_abi_json_1 = require("../resources/erc20.abi.json");
const async_retry_1 = __importDefault(require("async-retry"));
const dotenv = __importStar(require("dotenv"));
const db_interact_1 = require("./db_interact");
dotenv.config({ path: "./.env" });
const cliArgs = process.argv;
const { PROVIDER_URL } = process.env;
const blockchain_reader = new blockchain_reader_1.BlockchainReader(String(PROVIDER_URL));
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
function readEvent(eventSignature, fromBlock, toBlock) {
    return __awaiter(this, void 0, void 0, function* () {
        // convert event signature to keccak256 hash.
        const eventHexStr = ethers_1.ethers.keccak256(ethers_1.ethers.toUtf8Bytes(eventSignature));
        const stargateHexStr = ethers_1.ethers.AbiCoder.defaultAbiCoder().encode(["address"], ["0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"]);
        const topics = [eventHexStr, stargateHexStr]; //hardcoded the starget router address
        const events = yield blockchain_reader.getEvents(fromBlock, toBlock, topics, [
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        ]);
        console.log(`The number of logs to parse: ${events.length}`);
        parseLogBlocked(events);
        return events; //return the events list (events here are encoded)
    });
}
exports.readEvent = readEvent;
/** forEach VERSION (does not wait for each transaction details object to be created before moving onto the next)
 * function used to decode the encoded Logs and store the necessary data into
 * The database. Consider adding a way to check the range of block numbers we have in out
 */
function parseLog(logs) {
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
            const receipt = yield (0, async_retry_1.default)(() => transactionReceipt(log.transactionHash), retryOptions);
            const block = yield (0, async_retry_1.default)(() => block_(log.blockNumber), retryOptions);
            details.gasPrice = receipt.gasPrice;
            details.gasUsed = receipt.gasUsed;
            details.timestamp = block.timestamp;
            //save into the database
            yield (0, db_interact_1.saveTransactioninfo)(details);
        }));
        yield Promise.all(promises);
    });
}
/** for loop VERSION (waits for each transaction details object to be create before moving onto the next)
 * function used to decode the encoded Logs and store the necessary data into
 * The database. (I used this for tesing purposes)
 */
function parseLogBlocked(logs) {
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
                const receipt = yield transactionReceipt(log.transactionHash);
                const block = yield block_(log.blockNumber);
                details.gasPrice = receipt.gasPrice;
                details.gasUsed = receipt.gasUsed;
                details.timestamp = block.timestamp;
                //save into database
                yield (0, db_interact_1.saveTransactioninfo)(details);
            }
            catch (error) {
                console.error(error);
                throw new Error(`${error}`);
            }
        }
    });
}
//returns Transaction receipt for a given transactioNhash
const transactionReceipt = (transactionHash) => __awaiter(void 0, void 0, void 0, function* () {
    const receipt = yield blockchain_reader.getTransactionReceipt(transactionHash);
    if (!receipt) {
        console.error("HTTP error 429: Too Many Requests, retrying...");
        throw new Error("HTTP error 429: Too Many Requests, retrying...");
    }
    return receipt;
});
//returns block for a given blockNumber
const block_ = (blockNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const block = yield blockchain_reader.getBlock(blockNumber);
    if (!block) {
        console.error("HTTP error 429: Too Many Requests, retrying...");
        throw new Error("HTTP error 429: Too Many Requests, retrying...");
    }
    return block;
});
if (cliArgs.length != 4) {
    throw new Error(`Number of arugments entered: ${cliArgs.length - 2}. Two arguments are required: fromBlock and toBlock.`);
}
else {
    main();
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        readEvent("Transfer(address,address,uint256)", Number(cliArgs[2]), Number(cliArgs[3]));
    });
}
