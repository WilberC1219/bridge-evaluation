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
exports.execute = void 0;
function execute(args, db_interact, blockchain_reader, read_events) {
    return __awaiter(this, void 0, void 0, function* () {
        let { startblock, endblock } = args;
        if (startblock == undefined || startblock == null) {
            console.log(`[Error] error with start block input`);
        }
        else if (endblock == undefined || endblock == null) {
            console.log(`[Error] error with end block input`);
        }
        else if (endblock < startblock) {
            console.log(`[Error] error start block cannot be less than end block`);
        }
        else {
            //convert blocks to Numbers
            try {
                startblock = Number(startblock);
                endblock = Number(endblock);
                // no error occured proceed to store the blocks entered into the database
                const numAdded = yield read_events.readEvent("Transfer(address,address,uint256)", startblock, endblock);
                console.log(`Finished adding transactions in block range ${startblock} to ${endblock}\nA total of ${numAdded} transactions were added to the database`);
            }
            catch (error) {
                console.error(error);
            }
        }
    });
}
exports.execute = execute;
