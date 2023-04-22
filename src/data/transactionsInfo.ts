import { BeforeInsert, Column, Entity, Index, PrimaryColumn } from "typeorm";
import { AppDataSource } from "../data_source";
import { POSTGRESQL_ERROR } from "../constants/postgresql";
import { Blockchain } from "../constants/data_enums";
import { uuidWithPrefix } from "../utils/uuid";
@Entity({ name: "transaction_information" })
@Index("unique_transaction_information", ["transactionHash", "blockchain"], { unique: true })
export class TransactionInformation {
  @PrimaryColumn({ name: "id", type: "text", update: false })
  id: string;

  @Column({ name: "transaction_hash", type: "text", update: false })
  transactionHash: string;

  @Column({ name: "transfer_amount", type: "bigint", update: false })
  transferAmount: number;

  @Column({ name: "blockchain", type: "text", update: false })
  blockchain: Blockchain;

  @Column({ name: "block_number", type: "numeric", update: false })
  blockNumber: number;

  @Column({ name: "gas_price", type: "bigint", update: false })
  gasPrice: number;

  @Column({ name: "gas_used", type: "bigint", update: false })
  gasUsed: number;

  @Column({ name: "timestamp", type: "numeric", update: false })
  timestamp: number;

  @BeforeInsert()
  // @ts-ignore
  private beforeInsert() {
    this.validate();
    this.generateUuid();
  }

  generateUuid(): void {
    this.id = uuidWithPrefix(true, "app");
  }

  async validate(): Promise<void> {
    this.transactionHash = this.transactionHash?.trim()?.toLocaleLowerCase();
  }

  equal(transactionHash: string, blockchain: Blockchain): boolean {
    return this.transactionHash == transactionHash && this.blockchain == blockchain;
  }

  static async create(transactionHash: string, blockchain: Blockchain): Promise<TransactionInformation> {
    const transaction = new TransactionInformation();
    transaction.transactionHash = transactionHash;
    transaction.blockchain = blockchain;

    const insertResult = await AppDataSource.createQueryBuilder()
      .insert()
      .into(TransactionInformation)
      .values(transaction)
      .orIgnore()
      .returning("*")
      .execute();

    if ((insertResult.raw as Array<TransactionInformation>).length == 0) {
      const collidingEntry = await AppDataSource.getRepository(TransactionInformation).findOne({
        where: { transactionHash, blockchain },
      });
      if (collidingEntry?.equal(transactionHash, blockchain)) {
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
