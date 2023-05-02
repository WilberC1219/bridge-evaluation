import { BlockchainReader } from "../blockchain_reader";
import { ReadEvent } from "../read_events";
import { DBInteract } from "../db_interact";

export async function execute(
  args: { [key: string]: any },
  db_interact: DBInteract,
  blockchain_reader: BlockchainReader,
  read_events: ReadEvent
): Promise<void> {
  const blockNum = await blockchain_reader.getLatestBlockNumber();
  console.log(`The latest block is ${blockNum}`);
}
