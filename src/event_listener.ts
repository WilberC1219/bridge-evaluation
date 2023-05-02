import { BlockchainReader } from "./blockchain_reader";
import { ReadEvent } from "./read_events";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export class EventListener {
  private read_events: ReadEvent;
  private blockchainReader: BlockchainReader;
  constructor(read_events: ReadEvent) {
    const { PROVIDER_URL } = process.env;
    this.blockchainReader = new BlockchainReader(String(PROVIDER_URL));
    this.read_events = read_events;
  }

  public async listenToEvents(): Promise<void> {
    this.blockchainReader.listenToBlockHeaders(async (blockNumber: number) => {
      //store any new transaction into database
      this. read_events.readEvent("Transfer(address,address,uint256)", blockNumber, blockNumber);
    });
  }
}
