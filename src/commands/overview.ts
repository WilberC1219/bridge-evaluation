//This function will get the overview of transactions for a particular day
import { BlockchainReader } from "../blockchain_reader";
import moment from "moment";
import { DBInteract } from "../db_interact";
import axios from "axios";
export async function execute(
  args: { [key: string]: any },
  db_interact: DBInteract,
  blockchain_reader: BlockchainReader
): Promise<void> {
  let { start, end } = args;

  //check input for valid start end end date entered
  if (start == undefined || start == null || !moment(start, "YYYY-MM-DD", true).isValid()) {
    console.log(`[Error] error with start date input`);
  } else if (end == undefined || end == null || !moment(end, "YYYY-MM-DD", true).isValid()) {
    console.log(`[Error] error with end date input`);
  } else {
    const unix_start = moment(start).unix();
    const unix_end = moment(end).unix() + (86400 - 1);

    //using the dates filter through the database.
    const exchangeRes = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
    const exchangeRate = exchangeRes.data.ethereum.usd;
    const count = await db_interact.getNumberOfTransactions(unix_start, unix_end);
    const highestFeeDetails = await db_interact.highestTransactionDetails(unix_start, unix_end);
    const lowestFeeDetails = await db_interact.lowestTransactionDetails(unix_start, unix_end);
    const expTime = new Date(highestFeeDetails.timestamp * 1000).toLocaleString();
    const cheapTime = new Date(lowestFeeDetails.timestamp * 1000).toLocaleString();
    console.log(`\nTransaction overview for ${start} to ${end}:`);
    console.log(`\t-Total number of transactions: ${count}`);
    console.log(
      `\t-Tranaction with highest fee: \n\t\t Transaction Hash: ${
        highestFeeDetails.transactionHash
      }\n\t\t Transfer Amount: ${highestFeeDetails.transferAmount / 1000000} USDC\n\t\t Transaction Fee: $${
        (highestFeeDetails.feevalue / 10 ** 18) * exchangeRate
      }`
    );

    console.log(
      `\t-Tranaction with lowest fee: \n\t\t Transaction Hash: ${
        lowestFeeDetails.transactionHash
      }\n\t\t Transfer Amount: ${lowestFeeDetails.transferAmount / 1000000} USDC \n\t\t Transaction Fee: $${
        (lowestFeeDetails.feevalue / 10 ** 18) * exchangeRate
      }`
    );

    console.log(`\t-Highest transaction fee occured at time: ${expTime}`);
    console.log(`\t-Lowest transaction fee occured at time: ${cheapTime}`);
  }
}
