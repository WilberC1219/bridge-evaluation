"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data_source");
const read_events_1 = require("./read_events");
const event_listener_1 = require("./event_listener");
const db_interact_1 = require("./db_interact");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const dotenv = __importStar(require("dotenv"));
const blockchain_reader_1 = require("./blockchain_reader");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
dotenv.config({ path: "./.env" });
const { PROVIDER_URL } = process.env;
const blockchain_reader = new blockchain_reader_1.BlockchainReader(String(PROVIDER_URL));
const db_interact = new db_interact_1.DBInteract(data_source_1.AppDataSource);
const read_events = new read_events_1.ReadEvent(blockchain_reader, db_interact);
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting server");
    yield data_source_1.AppDataSource.initialize()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("[Success] DB is connected");
        //assumes that gett latest block will work
        const db_interact = new db_interact_1.DBInteract(data_source_1.AppDataSource);
        const lastBlock = yield db_interact.getLastestBlockAdded();
        if (lastBlock > 0) {
            //added blocks that were created since last running the program
            console.log(`Searching for any new transactions since block ${lastBlock}`);
            const num_added = yield read_events.readEvent("Transfer(address,address,uint256)", Number(lastBlock) + 1);
            console.log(`Added ${num_added} transactions to the database`);
            //begin main program, which listens for user input and prints information out to the console
            main();
        }
    }))
        .catch((error) => {
        console.log("[Error] Error connecting DB", error);
    });
}))();
function main() {
    //start event listener that will for any transactions that may occur while running program
    const blockListener = new event_listener_1.EventListener(read_events).listenToEvents();
    //listen for user input in the CLI. These commands will read from
    //the database
    rl.setPrompt("\nEnter a command: ");
    rl.prompt();
    rl.on("line", (command) => __awaiter(this, void 0, void 0, function* () {
        yield processCommand(command.split(" "));
        rl.prompt();
    })).on("close", () => {
        console.log("Exiting program...");
        process.exit(0);
    });
    //number of transaction, how many going out?, how many coming in?, where were those coming in originating from, where were those leaving going to, etc
}
//Function used to run commands that are available in the commands directoryhello
function processCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        //command is an array, where index 0 is the command
        const tsfileName = path.join(__dirname, `/commands/${command[0]}.ts`);
        const jsfileName = path.join(__dirname, `/commands/${command[0]}.js`);
        const params = parseParams(command.slice(1));
        if (fs.existsSync(tsfileName)) {
            const module = require(tsfileName);
            yield module.execute(params, db_interact, blockchain_reader, read_events);
        }
        else if (fs.existsSync(jsfileName)) {
            const module = require(jsfileName);
            yield module.execute(params, db_interact, blockchain_reader, read_events);
        }
        else {
            console.log("Invalid command. Please try again.");
        }
    });
}
//parses the params and returns an object with various properties and values
function parseParams(args) {
    const params = {};
    args.forEach((paramStr) => {
        const parts = paramStr.split(":");
        if (parts.length === 2) {
            const propName = parts[0].trim().toLowerCase();
            const propValue = parts[1].trim();
            params[propName] = propValue;
        }
    });
    return params;
}
