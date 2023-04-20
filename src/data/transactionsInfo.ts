import { Entity } from "typeorm";

@Entity({ name: "transaction_information" })
export class TransactionInformation {
  transactionHash: string;
}
