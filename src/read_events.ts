import { BlockchainReader } from "./blockchain_reader";
import { ethers } from "ethers";
import { abi } from "../resources/erc20.abi.json";
import retry from "async-retry";
import * as dotenv from "dotenv";
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

  parseLogV2(events);
  return events; //return the events list (events here are encoded)
}

/** forEach VERSION (does not wait for each transaction details object to be created before moving onto the next)
 * function used to decode the encoded Logs and store the necessary data into
 * The database.
 */
async function parseLogV1(logs: ethers.Log[]): Promise<void> {
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

      //store into the data base
    } catch (error) {
      console.error(error);
      throw new Error(`Error occured with transaction!`);
    }
  });
}

/** for loop VERSION (waits for each transaction details object to be create before moving onto the next)
 * function used to decode the encoded Logs and store the necessary data into
 * The database.
 */
async function parseLogV2(logs: ethers.Log[]): Promise<void> {
  const abiObj = new ethers.Interface(abi);
  const transactions: any = [];
  for (const log of logs) {
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
      console.log(details);
      transactions.push(details);
      //store into the data base
    } catch (error) {
      console.error(error);
      throw new Error(`Error occured with transaction!`);
    }
  }
}

/**
 *
 * @param transactionHash
 * @returns Tranaction
 */
const transactionReceipt = async (transactionHash: string): Promise<ethers.TransactionReceipt> => {
  const receipt = await blockchain_reader.getTransactionReceipt(transactionHash);
  if (!receipt) {
    console.error("HTTP error 429: Too Many Requests, retrying...");
    throw new Error("HTTP error 429: Too Many Requests, retrying...");
  }
  return receipt;
};

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

/** receipt output
 TransactionReceipt {
  provider: JsonRpcProvider {},
  to: '0x902F09715B6303d4173037652FA7377e5b98089E',
  from: '0xe93685f3bBA03016F02bD1828BaDD6195988D950',
  contractAddress: null,
  hash: '0x1fcebee92cc50d1d9908d64e82b9ce43bbd9ae4250626fe82607f5c4b3dd54e8',
  index: 10,
  blockHash: '0xb566cebb43fafaa2ae491f2f87cd095eb0cc338e58a08202472faa9fd2349959',
  blockNumber: 17068811,
  logsBloom: '0x0000000000000000000000000000000000000000000000000000000000000000000100000000000100000000001000000000000000000008000000000000000000004000080000000800004c000000000080000000000080000000000000800080000000000000000000000000000000000000000000000002000010000000000002000002000000000000000000000080008000010000000000000000000000000000000000200020000004000000000000000000080000000000000000000080000002000000000000000000000000000000000000000001010000000000000000800000000000000000000000000000000000401000000000000000000000',
  gasUsed: 238181n,
  cumulativeGasUsed: 954747n,
  gasPrice: 48650049692n,
  type: 0,
  status: 1,
  root: undefined
}
 */

/** getBlock output
 Block {
  provider: JsonRpcProvider {},
  number: 17068811,
  hash: '0xb566cebb43fafaa2ae491f2f87cd095eb0cc338e58a08202472faa9fd2349959',
  timestamp: 1681762775,
  parentHash: '0x3cd4b7b96c49161d3453c503ec8d0a6cb5efafe111b5bb35fba66f358c74e66d',
  nonce: '0x0000000000000000',
  difficulty: 0n,
  gasLimit: 30000000n,
  gasUsed: 10829932n,
  miner: '0x4675C7e5BaAFBFFbca748158bEcBA61ef3b0a263',
  extraData: '0x4e65746865726d696e64',
  baseFeePerGas: 39959401688n
}
 */

/** Log example outputs
 After decode:
LogDescription {
  fragment: EventFragment {
    type: 'event',
    inputs: [ [ParamType], [ParamType], [ParamType] ],
    name: 'Transfer',
    anonymous: false
  },
  name: 'Transfer',
  signature: 'Transfer(address,address,uint256)',
  topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  args: Result(3) [
    '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56',
    '0x4A337d1dF22d0D3077CaEFd083A1b70AA168d087',
    809494972n
  ]
}
*******************************
Before decode:
Log {
  provider: JsonRpcProvider {},
  transactionHash: '0x1fcebee92cc50d1d9908d64e82b9ce43bbd9ae4250626fe82607f5c4b3dd54e8',
  blockHash: '0xb566cebb43fafaa2ae491f2f87cd095eb0cc338e58a08202472faa9fd2349959',
  blockNumber: 17068811,
  removed: false,
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  data: '0x0000000000000000000000000000000000000000000000000000000011d689c1',
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000df0770df86a8034b3efef0a1bb3c889b8332ff56',
 */

/*                    '
  show how the cost of bridging USDC from Ethereum using Stargate varies over time
  
  1)have the ability to get the timestamps and gas prices
    -given a range of blocks fromBlock toBlock. Print out transactionHash, timestamp, gasPrice
    -This can be done by first going into read_events and using readEvent() to get the logs from: fromBlock to: toBlock
    -for each individual log get the transactionHash. Then Decode it and get the amount $USDC transferred.
    -Using the transasctionHash get the timestamp of the transaction using the (for now use time from block)
    -store into the database
*/
