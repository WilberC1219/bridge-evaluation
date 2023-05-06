import { BlockchainReader } from "./blockchain_reader";
import { ethers } from "ethers";
import { abi } from "../resources/erc20.abi.json";
import retry from "async-retry";
import { Blockchain } from "./constants/data_enums";
import { DBInteract } from "./db_interact";
import { AppDataSource } from "./data_source";
import { DataSource } from "typeorm";
import { read } from "fs";
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

export class ReadEvent {
  private blockchain_reader: BlockchainReader;
  private db_interact: DBInteract;

  constructor(reader: BlockchainReader, db_interact: DBInteract) {
    this.blockchain_reader = reader;
    this.db_interact = db_interact;
  }

  public async readEvent(eventSignature: string, fromBlock: number, toBlock?: number): Promise<number> {
    // convert event signature to keccak256 hash.
    const eventHexStr = ethers.keccak256(ethers.toUtf8Bytes(eventSignature));
    const stargateHexStr = ethers.AbiCoder.defaultAbiCoder().encode(
      ["address"],
      ["0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"]
    );
    const topics = [eventHexStr, stargateHexStr]; //hardcoded the starget router address

    const events = await this.blockchain_reader.getEvents(fromBlock, toBlock, topics, [
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    ]);
    const num_events = events.length;
    this.parseLogBlocked(events);
    return num_events;
  }

  /** forEach VERSION (does not wait for each transaction details object to be created before moving onto the next)
   * function used to decode the encoded Logs and store the necessary data into
   * The database.
   */
  public async parseLog(logs: ethers.Log[]): Promise<void> {
    const abiObj = new ethers.Interface(abi);
    const promises = logs.map(async (log) => {
      const decoded = abiObj.parseLog({ topics: log.topics as string[], data: log.data });
      const usdcAmt = decoded ? decoded.args[2] : -1;
      const details = {
        transactionHash: log.transactionHash,
        transferAmount: usdcAmt,
        blockNumber: log.blockNumber,
        gasPrice: BigInt(-1),
        gasUsed: BigInt(-1),
        timestamp: -1,
      };

      const receipt = await retry(() => this.transactionReceipt(log.transactionHash), retryOptions);
      const block = await retry(() => this.block_(log.blockNumber), retryOptions);
      details.gasPrice = receipt.gasPrice;
      details.gasUsed = receipt.gasUsed;
      details.timestamp = block.timestamp;

      //save into the database
      await this.db_interact.saveTransactioninfo(details);
    });

    await Promise.all(promises);
  }

  /** for loop VERSION (waits for each transaction details object to be create before moving onto the next)
   * function used to decode the encoded Logs and store the necessary data into
   * The database.
   */
  public async parseLogBlocked(logs: ethers.Log[]): Promise<void> {
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
        const receipt = await this.transactionReceipt(log.transactionHash);
        const block = await this.block_(log.blockNumber);
        details.gasPrice = receipt.gasPrice;
        details.gasUsed = receipt.gasUsed;
        details.timestamp = block.timestamp;

        //save into database
        await this.db_interact.saveTransactioninfo(details);
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    }
  }

  //returns Transaction receipt for a given transactioNhash
  transactionReceipt = async (transactionHash: string): Promise<ethers.TransactionReceipt> => {
    const receipt = await this.blockchain_reader.getTransactionReceipt(transactionHash);
    if (!receipt) {
      console.error("HTTP error 429: Too Many Requests, retrying...");
      throw new Error("HTTP error 429: Too Many Requests, retrying...");
    }
    return receipt;
  };

  //returns block for a given blockNumber
  block_ = async (blockNumber: number): Promise<ethers.Block> => {
    const block = await this.blockchain_reader.getBlock(blockNumber);

    if (!block) {
      console.error("HTTP error 429: Too Many Requests, retrying...");
      throw new Error("HTTP error 429: Too Many Requests, retrying...");
    }

    return block;
  };
}
