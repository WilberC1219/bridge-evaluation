"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TransactionInformation_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionInformation = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data_source");
const postgresql_1 = require("../constants/postgresql");
const data_enums_1 = require("../constants/data_enums");
const uuid_1 = require("../utils/uuid");
let TransactionInformation = TransactionInformation_1 = class TransactionInformation {
    beforeInsert() {
        this.validate();
        this.generateUuid();
    }
    generateUuid() {
        this.id = (0, uuid_1.uuidWithPrefix)(true, "trn");
    }
    validate() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.transactionHash = (_b = (_a = this.transactionHash) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase();
        });
    }
    equal(transactionHash, blockchain, blockNumber, transferAmount) {
        return (this.transactionHash == transactionHash &&
            this.blockchain == blockchain &&
            this.blockNumber == blockNumber &&
            this.transferAmount == transferAmount);
    }
    static create(transactionHash, blockchain, blockNumber, transferAmount, gasUsed, gasPrice, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = new TransactionInformation_1();
            transaction.transactionHash = transactionHash;
            transaction.blockchain = blockchain;
            transaction.blockNumber = blockNumber;
            transaction.transferAmount = transferAmount;
            transaction.gasUsed = gasUsed;
            transaction.gasPrice = gasPrice;
            transaction.timestamp = timestamp;
            const insertResult = yield data_source_1.AppDataSource.manager
                .createQueryBuilder()
                .insert()
                .into("transaction_information")
                .values(transaction)
                .orIgnore()
                .returning("*")
                .execute();
            if (insertResult.raw.length == 0) {
                const collidingEntry = yield data_source_1.AppDataSource.getRepository(TransactionInformation_1).findOne({
                    where: { transactionHash, blockchain, blockNumber },
                });
                if (collidingEntry === null || collidingEntry === void 0 ? void 0 : collidingEntry.equal(transactionHash, blockchain, blockNumber, transferAmount)) {
                    return collidingEntry;
                }
                else {
                    throw {
                        code: postgresql_1.POSTGRESQL_ERROR.UNIQUE_VIOLATION,
                        constraint: "unique_application",
                        message: 'duplicate key value violates unique constraint "unique_application"',
                    };
                }
            }
            return transaction;
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "id", type: "text", update: false }),
    __metadata("design:type", String)
], TransactionInformation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "transaction_hash", type: "text", update: false }),
    __metadata("design:type", String)
], TransactionInformation.prototype, "transactionHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "transfer_amount", type: "bigint", update: false }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], TransactionInformation.prototype, "transferAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "blockchain", type: "text", update: false }),
    __metadata("design:type", String)
], TransactionInformation.prototype, "blockchain", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "block_number", type: "numeric", update: false }),
    __metadata("design:type", Number)
], TransactionInformation.prototype, "blockNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gas_price", type: "bigint", update: false }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], TransactionInformation.prototype, "gasPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gas_used", type: "bigint", update: false }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], TransactionInformation.prototype, "gasUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "timestamp", type: "numeric", update: false }),
    __metadata("design:type", Number)
], TransactionInformation.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)()
    // @ts-ignore
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionInformation.prototype, "beforeInsert", null);
TransactionInformation = TransactionInformation_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "transaction_information" }),
    (0, typeorm_1.Index)("unique_transaction_information", ["transactionHash", "blockchain", "blockNumber", "transferAmount"], {
        unique: true,
    })
], TransactionInformation);
exports.TransactionInformation = TransactionInformation;
