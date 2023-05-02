//this file is meant to be used to interact with the saving and retrieving data from the database
import { TransactionInformation } from "./data/transactionsInfo";
import { Blockchain } from "./constants/data_enums";
import { DataSource } from "typeorm";

export class DBInteract {
  private AppDataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.AppDataSource = dataSource;
  }

  public async saveTransactioninfo(details: any) {
    try {
      await TransactionInformation.create(
        details.transactionHash,
        Blockchain.ETHEREUM,
        details.blockNumber,
        details.transferAmount,
        details.gasUsed,
        details.gasPrice,
        details.timestamp
      );
      //console.log(`transaction ${details.transactionHash} has been saved`);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  //returns the number of transactions that have occured between start time and end time
  public async getNumberOfTransactions(startTime: number, endTime: number) {
    const count = await this.AppDataSource.getRepository(TransactionInformation)
      .createQueryBuilder("transaction_information")
      .select("COUNT(*)")
      .where(`"timestamp" >= ${startTime} AND "timestamp" <= ${endTime}`)
      .getRawOne();

    return count.count;
  }

  //gets the lowest transaction fee. Will query to get the lowest transaction fee
  //this will be computed by getting the row which returns the smallest value of
  //(gas price * gas used) once row with lowest fee is found, convert it to usd
  //get exchange from this api
  public async lowestTransactionDetails(startTime: number, endTime: number) {
    const result = await this.AppDataSource.getRepository(TransactionInformation)
      .createQueryBuilder("t")
      .select("t.gas_price * t.gas_used", "feevalue")
      .addSelect("t.gas_price", "gasPrice")
      .addSelect("t.gas_used", "gasUsed")
      .addSelect("t.transaction_hash", "transactionHash")
      .addSelect("t.transfer_amount", "transferAmount")
      .where(`t.timestamp >= ${startTime} AND t.timestamp <= ${endTime}`)
      .groupBy("t.gas_price, t.gas_used, t.transaction_hash, t.transfer_amount")
      .orderBy("feevalue", "ASC")
      .getRawOne();

    return result; //transaction fee is in wei
  }

  //gets the highest transaction fee. Will query to get the highest transaction fee
  //this will be computed by getting the row which returns the smallest value of
  //(gas price * gas used). once row with highest fee is found, convert it to usd
  //get exchange from this api https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd
  public async highestTransactionDetails(startTime: number, endTime: number) {
    const result = await this.AppDataSource.getRepository(TransactionInformation)
      .createQueryBuilder("t")
      .select("t.gas_price * t.gas_used", "feevalue")
      .addSelect("t.gas_price", "gasPrice")
      .addSelect("t.gas_used", "gasUsed")
      .addSelect("t.transaction_hash", "transactionHash")
      .addSelect("t.transfer_amount", "transferAmount")
      .where(`t.timestamp >= ${startTime} AND t.timestamp <= ${endTime}`)
      .groupBy("t.gas_price, t.gas_used, t.transaction_hash, t.transfer_amount")
      .orderBy("feevalue", "DESC")
      .getRawOne();

    return result; //transaction fee is in wei
  }

  //gets the block number of the last block that was added to the database
  public async getLastestBlockAdded(): Promise<number> {
    const res = await this.AppDataSource.getRepository(TransactionInformation)
      .createQueryBuilder("transaction_information")
      .orderBy("transaction_information.block_number", "DESC")
      .take(1)
      .getOne();

    return res ? res.blockNumber : -1;
  }
}
