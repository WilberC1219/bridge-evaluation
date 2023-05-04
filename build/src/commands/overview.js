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
exports.execute = void 0;
const moment_1 = __importDefault(require("moment"));
const axios_1 = __importDefault(require("axios"));
function execute(args, db_interact, blockchain_reader) {
    return __awaiter(this, void 0, void 0, function* () {
        let { start, end } = args;
        //check input for valid start end end date entered
        if (start == undefined || start == null || !(0, moment_1.default)(start, "YYYY-MM-DD", true).isValid()) {
            console.log(`[Error] error with start date input`);
        }
        else if (end == undefined || end == null || !(0, moment_1.default)(end, "YYYY-MM-DD", true).isValid()) {
            console.log(`[Error] error with end date input`);
        }
        else {
            const unix_start = (0, moment_1.default)(start).unix();
            const unix_end = (0, moment_1.default)(end).unix() + (86400 - 1);
            //using the dates filter through the database.
            const exchangeRes = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
            const exchangeRate = exchangeRes.data.ethereum.usd;
            const count = yield db_interact.getNumberOfTransactions(unix_start, unix_end);
            const highestFeeDetails = yield db_interact.highestTransactionDetails(unix_start, unix_end);
            const lowestFeeDetails = yield db_interact.lowestTransactionDetails(unix_start, unix_end);
            const expTime = new Date(highestFeeDetails.timestamp * 1000).toLocaleString();
            const cheapTime = new Date(lowestFeeDetails.timestamp * 1000).toLocaleString();
            console.log(`\nTransaction overview for ${start} to ${end}:`);
            console.log(`\t-Total number of transactions: ${count}`);
            console.log(`\t-Tranaction with highest fee: \n\t\t Transaction Hash: ${highestFeeDetails.transactionHash}\n\t\t Transfer Amount: ${highestFeeDetails.transferAmount / 1000000} USDC\n\t\t Transaction Fee: $${(highestFeeDetails.feevalue / Math.pow(10, 18)) * exchangeRate}`);
            console.log(`\t-Tranaction with lowest fee: \n\t\t Transaction Hash: ${lowestFeeDetails.transactionHash}\n\t\t Transfer Amount: ${lowestFeeDetails.transferAmount / 1000000} USDC \n\t\t Transaction Fee: $${(lowestFeeDetails.feevalue / Math.pow(10, 18)) * exchangeRate}`);
            console.log(`\t-Highest transaction fee occured at time: ${expTime}`);
            console.log(`\t-Lowest transaction fee occured at time: ${cheapTime}`);
        }
    });
}
exports.execute = execute;
