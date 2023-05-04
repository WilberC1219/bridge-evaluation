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
exports.CreateTransactionTable1682380883634 = void 0;
class CreateTransactionTable1682380883634 {
    constructor() {
        this.name = 'CreateTransactionTable1682380883634';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "transaction_information" ("id" text NOT NULL, "transaction_hash" text NOT NULL, "transfer_amount" bigint NOT NULL, "blockchain" text NOT NULL, "block_number" numeric NOT NULL, "gas_price" bigint NOT NULL, "gas_used" bigint NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_1ec9a6ba0116631fb18edbf6f32" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE UNIQUE INDEX "unique_transaction_information" ON "transaction_information" ("transaction_hash", "blockchain", "block_number", "transfer_amount") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."unique_transaction_information"`);
            yield queryRunner.query(`DROP TABLE "transaction_information"`);
        });
    }
}
exports.CreateTransactionTable1682380883634 = CreateTransactionTable1682380883634;
