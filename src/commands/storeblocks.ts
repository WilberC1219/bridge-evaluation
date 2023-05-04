import { read } from "fs";
import { BlockchainReader } from "../blockchain_reader";
import { ReadEvent } from "../read_events";
import { DBInteract } from "../db_interact";
export async function execute(
  args: { [key: string]: any },
  db_interact: DBInteract,
  blockchain_reader: BlockchainReader,
  read_events: ReadEvent
): Promise<void> {
  let { startblock, endblock } = args;

  if (startblock == undefined || startblock == null) {
    console.log(`[Error] error with start block input`);
  } else if (endblock == undefined || endblock == null) {
    console.log(`[Error] error with end block input`);
  } else if (endblock < startblock) {
    console.log(`[Error] error start block cannot be less than end block`);
  } else if (endblock - startblock >= 2000) {
    console.log(`[Error] The difference between starting block and ending block cannot exceed 2000`);
  } else {
    //convert blocks to Numbers
    try {
      startblock = Number(startblock);
      endblock = Number(endblock);

      // no error occured proceed to store the blocks entered into the database
      const numAdded = await read_events.readEvent("Transfer(address,address,uint256)", startblock, endblock);
      console.log(
        `Finished adding transactions in block range ${startblock} to ${endblock}\nA total of ${numAdded} transactions were added to the database`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
