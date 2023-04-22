import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionTable1682125851770 implements MigrationInterface {
  name = "CreateTransactionTable1682125851770";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction_information" ("id" text NOT NULL, "transaction_hash" text NOT NULL, "transfer_amount" bigint NOT NULL, "blockchain" text NOT NULL, "block_number" numeric NOT NULL, "gas_price" bigint NOT NULL, "gas_used" bigint NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_1ec9a6ba0116631fb18edbf6f32" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_transaction_information" ON "transaction_information" ("transaction_hash", "blockchain") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."unique_transaction_information"`);
    await queryRunner.query(`DROP TABLE "transaction_information"`);
  }
}
