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
exports.saveTransactioninfo = void 0;
//this file is meant to be used to interact with the saving and retrieving data from the database
const transactionsInfo_1 = require("./data/transactionsInfo");
const data_enums_1 = require("./constants/data_enums");
function saveTransactioninfo(details) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`attempting to store transaction`);
            yield transactionsInfo_1.TransactionInformation.create(details.transactionHash, data_enums_1.Blockchain.ETHEREUM, details.blockNumber, details.transferAmount, details.gasUsed, details.gasPrice, details.timestamp);
            //console.log(`transaction ${details.transactionHash} has been saved`);
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
}
exports.saveTransactioninfo = saveTransactioninfo;
//must think about how to design this to retrieve data from the database
//ex: what parameters will be used to filter for transactions on the database
//use block numbers?
function getTransactionInfo() {
    return __awaiter(this, void 0, void 0, function* () { });
}
