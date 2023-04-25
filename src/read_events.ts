import { BlockchainReader } from "./blockchain_reader";
import { ethers } from "ethers";
import { abi } from "../resources/erc20.abi.json";
import retry from "async-retry";
import * as dotenv from "dotenv";
import { TransactionInformation } from "./data/transactionsInfo";
import { Blockchain } from "./constants/data_enums";
import { AppDataSource } from "./data_source";

dotenv.config({ path: "./.env" });
const cliArgs = process.argv;
const { PROVIDER_URL } = process.env;
const blockchain_reader = new BlockchainReader(String(PROVIDER_URL));
const retryOptions = {
  retries: 10, // Number of retries before giving up
  factor: 2, // Exponential factor
  minTimeout: 3000, // Minimum wait time before retrying
  maxTimeout: 60000, // Maximum wait time before retrying
  randomize: true, // Randomize the wait time
};

/**
 * readEvent function. retrieves a list of transfer events from and to Stargate.
 */
async function readEvent(
  blockchain_reader: BlockchainReader,
  eventSignature: string,
  fromBlock: number,
  toBlock?: number
): Promise<ethers.Log[]> {
  // convert event signature to keccak256 hash.
  const eventHexStr = ethers.keccak256(ethers.toUtf8Bytes(eventSignature));
  const stargateHexStr = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address"],
    ["0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"]
  );
  const topics = [eventHexStr, stargateHexStr]; //hardcoded the starget router address

  const events = await blockchain_reader.getEvents(fromBlock, toBlock, topics, [
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  ]);

  parseLog(events);
  return events; //return the events list (events here are encoded)
}

/** forEach VERSION (does not wait for each transaction details object to be created before moving onto the next)
 * function used to decode the encoded Logs and store the necessary data into
 * The database.
 */
async function parseLog(logs: ethers.Log[]): Promise<void> {
  const abiObj = new ethers.Interface(abi);
  logs.forEach(async (log) => {
    const decoded = abiObj.parseLog({ topics: log.topics as string[], data: log.data });
    const usdcAmt = decoded ? decoded.args[2] : -1;
    try {
      const details = {
        transactionHash: log.transactionHash,
        transferAmount: usdcAmt,
        blockNumber: log.blockNumber,
        gasPrice: BigInt(-1),
        gasUsed: BigInt(-1),
        timestamp: -1,
      };
      const receipt = await retry(() => transactionReceipt(log.transactionHash), retryOptions);
      const block = await retry(() => block_(log.blockNumber), retryOptions);
      details.gasPrice = receipt.gasPrice;
      details.gasUsed = receipt.gasUsed;
      details.timestamp = block.timestamp;
      await saveTransaction(details);
    } catch (error) {
      console.error(error);
      throw new Error(`${error}`);
    }
  });
}

/** for loop VERSION (waits for each transaction details object to be create before moving onto the next)
 * function used to decode the encoded Logs and store the necessary data into
 * The database. (I used this for tesing purposes)
 */
async function parseLogBlocked(logs: ethers.Log[]): Promise<void> {
  const abiObj = new ethers.Interface(abi);
  for (const log of logs) {
    const decoded = abiObj.parseLog({ topics: log.topics as string[], data: log.data });
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
      const receipt = await transactionReceipt(log.transactionHash);
      const block = await block_(log.blockNumber);
      details.gasPrice = receipt.gasPrice;
      details.gasUsed = receipt.gasUsed;
      details.timestamp = block.timestamp;
      console.log("\nTransaction:");
      console.log(details, "\n");

      await saveTransaction(details);
    } catch (error) {
      console.error(error);
      throw new Error(`${error}`);
    }
  }
}

async function saveTransaction(details: any) {
  try {
    console.log(`attempting to store transaction`);
    TransactionInformation.create(
      details.transactionHash,
      Blockchain.ETHEREUM,
      details.blockNumber,
      details.transferAmount,
      details.gasUsed,
      details.gasPrice,
      details.timestamp
    );
    console.log(`transaction ${details.transactionHash} has been saved`);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

//returns Transaction receipt for a given transactioNhash
const transactionReceipt = async (transactionHash: string): Promise<ethers.TransactionReceipt> => {
  const receipt = await blockchain_reader.getTransactionReceipt(transactionHash);
  if (!receipt) {
    console.error("HTTP error 429: Too Many Requests, retrying...");
    throw new Error("HTTP error 429: Too Many Requests, retrying...");
  }
  return receipt;
};

//returns block for a given blockNumber
const block_ = async (blockNumber: number): Promise<ethers.Block> => {
  const block = await blockchain_reader.getBlock(blockNumber);

  if (!block) {
    console.error("HTTP error 429: Too Many Requests, retrying...");
    throw new Error("HTTP error 429: Too Many Requests, retrying...");
  }

  return block;
};

if (cliArgs.length != 4) {
  throw new Error(
    `Number of arugments entered: ${cliArgs.length - 2}. Two arguments are required: fromBlock and toBlock.`
  );
}

readEvent(blockchain_reader, "Transfer(address,address,uint256)", Number(cliArgs[2]), Number(cliArgs[3]));
