import { BlockchainReader } from "./blockchain_reader";

import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export class EventListener {
  private blockchainReader: BlockchainReader;

  constructor() {
    const { PROVIDER_URL } = process.env;
    this.blockchainReader = new BlockchainReader(String(PROVIDER_URL));
  }

  async listenToEvents(): Promise<void> {
    this.blockchainReader.listenToBlockHeaders(async (blockNumber: number) => {
      const now = new Date();
      const options = { timeZone: "America/New_York" };
      console.log(`Block number: ${blockNumber} | ${now.toLocaleString("en-US", options)} est`);
    });
  }
}
