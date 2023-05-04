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
exports.DBInteract = void 0;
//this file is meant to be used to interact with the saving and retrieving data from the database
const transactionsInfo_1 = require("./data/transactionsInfo");
const data_enums_1 = require("./constants/data_enums");
class DBInteract {
    constructor(dataSource) {
        this.AppDataSource = dataSource;
    }
    saveTransactioninfo(details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transactionsInfo_1.TransactionInformation.create(details.transactionHash, data_enums_1.Blockchain.ETHEREUM, details.blockNumber, details.transferAmount, details.gasUsed, details.gasPrice, details.timestamp);
                //console.log(`transaction ${details.transactionHash} has been saved`);
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    //returns the number of transactions that have occured between start time and end time
    getNumberOfTransactions(startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.AppDataSource.getRepository(transactionsInfo_1.TransactionInformation)
                .createQueryBuilder("transaction_information")
                .select("COUNT(*)")
                .where(`"timestamp" >= ${startTime} AND "timestamp" <= ${endTime}`)
                .getRawOne();
            return count.count;
        });
    }
    //gets the lowest transaction fee. Will query to get the lowest transaction fee
    //this will be computed by getting the row which returns the smallest value of
    //(gas price * gas used) once row with lowest fee is found, convert it to usd
    //get exchange from this api
    lowestTransactionDetails(startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AppDataSource.getRepository(transactionsInfo_1.TransactionInformation)
                .createQueryBuilder("t")
                .select("t.gas_price * t.gas_used", "feevalue")
                .addSelect("t.gas_price", "gasPrice")
                .addSelect("t.gas_used", "gasUsed")
                .addSelect("t.transaction_hash", "transactionHash")
                .addSelect("t.transfer_amount", "transferAmount")
                .addSelect("t.timestamp", "timestamp")
                .where(`t.timestamp >= ${startTime} AND t.timestamp <= ${endTime}`)
                .groupBy("t.gas_price, t.gas_used, t.transaction_hash, t.transfer_amount, t.timestamp")
                .orderBy("feevalue", "ASC")
                .getRawOne();
            return result; //transaction fee is in wei
        });
    }
    //gets the highest transaction fee. Will query to get the highest transaction fee
    //this will be computed by getting the row which returns the smallest value of
    //(gas price * gas used). once row with highest fee is found, convert it to usd
    //get exchange from this api https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd
    highestTransactionDetails(startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AppDataSource.getRepository(transactionsInfo_1.TransactionInformation)
                .createQueryBuilder("t")
                .select("t.gas_price * t.gas_used", "feevalue")
                .addSelect("t.gas_price", "gasPrice")
                .addSelect("t.gas_used", "gasUsed")
                .addSelect("t.transaction_hash", "transactionHash")
                .addSelect("t.transfer_amount", "transferAmount")
                .addSelect("t.timestamp", "timestamp")
                .where(`t.timestamp >= ${startTime} AND t.timestamp <= ${endTime}`)
                .groupBy("t.gas_price, t.gas_used, t.transaction_hash, t.transfer_amount, t.timestamp")
                .orderBy("feevalue", "DESC")
                .getRawOne();
            return result; //transaction fee is in wei
        });
    }
    //gets the block number of the last block that was added to the database
    getLastestBlockAdded() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.AppDataSource.getRepository(transactionsInfo_1.TransactionInformation)
                .createQueryBuilder("transaction_information")
                .orderBy("transaction_information.block_number", "DESC")
                .take(1)
                .getOne();
            return res ? res.blockNumber : -1;
        });
    }
}
exports.DBInteract = DBInteract;
