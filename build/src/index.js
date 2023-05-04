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
const data_source_1 = require("./data_source");
const read_events_1 = require("./read_events");
const event_listener_1 = require("./event_listener");
const cliArgs = process.argv;
//this is like the main program
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting server");
    yield data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("[Success] DB is connected");
        main();
    })
        .catch((error) => {
        console.log("[Error] Error connecting DB", error);
    });
}))();
function checkCliParams() {
    if (cliArgs.length != 4) {
        throw new Error(`Number of arugments entered: ${cliArgs.length - 2}. Two arguments are required: fromBlock and toBlock.`);
    }
}
function main() {
    //check for the proper number of parameters
    checkCliParams();
    //begin reading events from fill database up with transactions fromBlock and toBlock
    (0, read_events_1.readEvent)("Transfer(address,address,uint256)", Number(cliArgs[2]), Number(cliArgs[3]));
    //start event listener that will for any transactions that may occur while running program
    const blockListener = new event_listener_1.EventListener().listenToEvents();
    //print out some of the daily transaction details
    //number of transaction, how many going out?, how many coming in?, where were those coming in originating from, where were those leaving going to, etc
}
