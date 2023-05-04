import { BeforeInsert, Column, DataSource, Entity, Index, PrimaryColumn } from "typeorm";
import { AppDataSource } from "../data_source";
import { POSTGRESQL_ERROR } from "../constants/postgresql";
import { Blockchain } from "../constants/data_enums";
import { uuidWithPrefix } from "../utils/uuid";

@Entity({ name: "transaction_information" })
@Index("unique_transaction_information", ["transactionHash", "blockchain", "blockNumber", "transferAmount"], {
  unique: true,
})
export class TransactionInformation {
  @PrimaryColumn({ name: "id", type: "text", update: false })
  id: string;

  @Column({ name: "transaction_hash", type: "text", update: false })
  transactionHash: string;

  @Column({ name: "transfer_amount", type: "bigint", update: false })
  transferAmount: bigint;

  @Column({ name: "blockchain", type: "text", update: false })
  blockchain: Blockchain;

  @Column({ name: "block_number", type: "numeric", update: false })
  blockNumber: number;

  @Column({ name: "gas_price", type: "bigint", update: false })
  gasPrice: bigint;

  @Column({ name: "gas_used", type: "bigint", update: false })
  gasUsed: bigint;

  @Column({ name: "timestamp", type: "numeric", update: false })
  timestamp: number;

  @BeforeInsert()
  // @ts-ignore
  private beforeInsert() {
    this.validate();
    this.generateUuid();
  }

  generateUuid(): void {
    this.id = uuidWithPrefix(true, "trn");
  }

  async validate(): Promise<void> {
    this.transactionHash = this.transactionHash?.trim()?.toLocaleLowerCase();
  }

  equal(transactionHash: string, blockchain: Blockchain, blockNumber: number, transferAmount: bigint): boolean {
    return (
      this.transactionHash == transactionHash &&
      this.blockchain == blockchain &&
      this.blockNumber == blockNumber &&
      this.transferAmount == transferAmount
    );
  }

  static async create(
    transactionHash: string,
    blockchain: Blockchain,
    blockNumber: number,
    transferAmount: bigint,
    gasUsed: bigint,
    gasPrice: bigint,
    timestamp: number
  ): Promise<TransactionInformation> {
    const transaction = new TransactionInformation();
    transaction.transactionHash = transactionHash;
    transaction.blockchain = blockchain;
    transaction.blockNumber = blockNumber;
    transaction.transferAmount = transferAmount;
    transaction.gasUsed = gasUsed;
    transaction.gasPrice = gasPrice;
    transaction.timestamp = timestamp;

    const insertResult = await AppDataSource.manager
      .createQueryBuilder()
      .insert()
      .into("transaction_information")
      .values(transaction)
      .orIgnore()
      .returning("*")
      .execute();

    if ((insertResult.raw as Array<TransactionInformation>).length == 0) {
      const collidingEntry = await AppDataSource.getRepository(TransactionInformation).findOne({
        where: { transactionHash, blockchain, blockNumber },
      });
      if (collidingEntry?.equal(transactionHash, blockchain, blockNumber, transferAmount)) {
        return collidingEntry;
      } else {
        throw {
          code: POSTGRESQL_ERROR.UNIQUE_VIOLATION,
          constraint: "unique_application",
          message: 'duplicate key value violates unique constraint "unique_application"',
        };
      }
    }
    return transaction;
  }
}
