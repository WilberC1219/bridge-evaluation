import { BlockchainReader } from "../blockchain_reader";

export async function execute(blockchain_reader: BlockchainReader): Promise<void> {
  const blockNum = await blockchain_reader.getLatestBlockNumber();
  console.log(`The latest block is ${blockNum}`);
}
