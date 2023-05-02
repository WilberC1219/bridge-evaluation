import { AppDataSource } from "./data_source";
import { ReadEvent } from "./read_events";
import { EventListener } from "./event_listener";
import { TransactionInformation } from "./data/transactionsInfo";
import { DBInteract } from "./db_interact";
import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import * as dotenv from "dotenv";
import { IsNumber } from "class-validator";
import { BlockchainReader } from "./blockchain_reader";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
dotenv.config({ path: "./.env" });
const { PROVIDER_URL } = process.env;
const blockchain_reader = new BlockchainReader(String(PROVIDER_URL));
const db_interact = new DBInteract(AppDataSource);
const read_events = new ReadEvent(blockchain_reader, db_interact);
(async () => {
  console.log("Starting server");
  await AppDataSource.initialize()
    .then(async () => {
      console.log("[Success] DB is connected");

      //assumes that gett latest block will work
      const db_interact = new DBInteract(AppDataSource);
      const lastBlock = await db_interact.getLastestBlockAdded();
      if (lastBlock > 0) {
        //added blocks that were created since last running the program
        console.log(`starting to store blocks beginning from ${lastBlock}`);
        const num_added = await read_events.readEvent("Transfer(address,address,uint256)", Number(lastBlock) + 1);
        console.log(`finished adding ${num_added} blocks to the database`);

        //begin main program, which listens for user input and prints information out to the console
        main();
      }
    })
    .catch((error: any) => {
      console.log("[Error] Error connecting DB", error);
    });
})();

function main() {
  //start event listener that will for any transactions that may occur while running program
  const blockListener = new EventListener(read_events).listenToEvents();

  //listen for user input in the CLI. These commands will read from
  //the database
  rl.setPrompt("\nEnter a command: ");
  rl.prompt();

  rl.on("line", async (command) => {
    await processCommand(command.split(" "));
    rl.prompt();
  }).on("close", () => {
    console.log("Exiting program...");
    process.exit(0);
  });

  //number of transaction, how many going out?, how many coming in?, where were those coming in originating from, where were those leaving going to, etc
}

//Function used to run commands that are available in the commands directoryhello
async function processCommand(command: string[]): Promise<void> {
  //command is an array, where index 0 is the command
  const fileName = path.join(__dirname, `/commands/${command[0]}.ts`);
  const params = parseParams(command.slice(1));
  if (fs.existsSync(fileName)) {
    const module = require(fileName);
    await module.execute(params, db_interact, blockchain_reader);
  } else {
    console.log("Invalid command. Please try again.");
  }
}

//parses the params and returns an object with various properties and values
function parseParams(args: string[]): object {
  const params: { [key: string]: any } = {};
  args.forEach((paramStr: string) => {
    const parts = paramStr.split(":");
    if (parts.length === 2) {
      const propName = parts[0].trim().toLowerCase();
      const propValue = parts[1].trim();
      params[propName] = propValue;
    }
  });
  return params;
}
