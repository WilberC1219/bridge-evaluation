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
exports.BlockchainWriter = void 0;
const ethers_1 = require("ethers");
class BlockchainWriter {
    constructor(walletPrivateKey, providerUrl) {
        this.provider = ethers_1.ethers.getDefaultProvider(providerUrl);
        this.wallet = new ethers_1.Wallet(walletPrivateKey, this.provider);
        this.nonce = 0;
        //this.setNonce();
    }
    //private async setNonce(): Promise<void> {
    //this.nonce = await this.wallet.getNonce();
    //}
    submitTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.wallet.sendTransaction(Object.assign(Object.assign({}, transaction), { nonce: this.nonce++ }));
            return yield this.provider.getTransactionReceipt(response.hash);
        });
    }
}
exports.BlockchainWriter = BlockchainWriter;
