# Bridge-Evaluation

## Description

Bridge-Evaluation is program that can generate a brief summary of USDC transactions involving Stargate over a specified date range.

<br />

## Setup

1. Make sure you have the following installed on your machine:

   - Node.js, (used as server for running Typescript) you can install it from https://nodejs.org/en
   - Docker, (used for containers for running databases) you can install it from https://www.docker.com

   <br/>

2. Inorder to connect to any blockchain, an account with a node provider is required. The following are some providers that can be used:

   - Alchemy: https://www.alchemy.com
   - Infura: https://www.infura.io
   - QuickNode: https://www.quicknode.com

    <br />

3. After completing steps 1, 2, and cloning this repository, start up the Docker application then run the following command in your command line interface while in the root directory of `Bridge-Evaluation`.

```bash
docker-compose up -d
```

<br />

4. Connect to your postgresql database using pgadmin by navigating to localhost:5001 and sign in using credentials in the `compose.yml` file (email: admin@admin.com and password: root)

<br />

5. Register a server named `evaluating-bridges` in pgadmin with the following creds

   1. Host-name/Address: `<Container Name of the service named db in compose.yml>` by default it's `evaluating-bridges`
   2. Port: `<Container Port of the service named db in compose.yml>` by default it's `5432`
   3. Username: `<POSTGRES_USER env var of the service named db in compose.yml>` by default it's `username`
   4. Password: `<POSTGRES_PASSWORD env var of the service named db  compose.yml>` by default it's `password`

<br />

6. Install all node packages required by running the command

```bash
npm install
```

<br />

7. In the root directory of the project, add a `.env` file. Inside of the `.env` file add the following line. Replace `YOUR_NODE_PROVIDER_URL` with your node provider from step 2. Don't forget to save afterwards!

```
PROVIDER_URL=YOUR_NODE_PROVIDER_URL
```

<br />

8. Set up the database table `transaction_information`. In order to set up the table make sure docker is still open and running the container created in step 3 then in the root directory of the project run the command:

```
npm run run-db-migrations
```

<br />

## Running Bridge-Evaluation

Aftering completing the setup steps 1 through 8, `Bridge-Evaluation` can be ran on your machine. in order to start the program use the command:

```bash
npm run start
```

<br />

- Below is an example of starting Bridge-Evaluation after completing steps 1 through 8.

```
 bridge-evaluation % npm run start

> bridge-evaluation@1.0.0 start
> npm run build && node ./build/src/index.js


> bridge-evaluation@1.0.0 build
> rimraf ./build && tsc

Starting server
[Success] DB is connected
There are no transactions in the database. Use storeblocks command to store blocks into the database

Enter a command:
```

<br />

## Storing Transactions into the database

- After successfully starting `Bridge-Evaluation`, we can store transactions that are stored within a given block range by using the `storeblocks` command. `storeblocks` takes two parameters, `startblock` and `endblock`. `startblock` is the starting block number where `Bridge-Evaluation` will begin storing transactions involving USDC and stargate. `endblock` is the final block number where `Bridge-Evaluation` will stop storing transactions involving USDC and stargate. Below is an example of using `storeblocks` (The block range in the example below contains transactions that occurred between April 27, 2023 to May 05, 2023)

```
Enter a command: storeblocks startblock:17141945 endblock:17196155
Finished adding transactions in block range 17141945 to 17196155
A total of 697 transactions were added to the database

Enter a command:
```

- After running the previous example, feel free to check the `transaction_information` table on pgadmin. The table will store all the transactions that were just stored from running the `storeblocks` command.

<br />

## Getting overview of transactions

- To obtain a brief summary of transactions for a given date range, the `overview` command is used, it requires two parameters. The first parameter is `start`, which specifies the beginning date of the date range to be searched, while the second parameter is `end`, indicating the ending date of the date range to be searched (the format for the dates must be YYYY-MM-DD). Below is an example of using the `overview` command on the transactions that were store in the previous example.

```
Enter a command: overview start:2023-04-27 end:2023-05-05

Transaction overview for 2023-04-27 to 2023-05-05:
        -Total number of transactions: 697
        -Tranaction with highest fee:
                 Transaction Hash: 0xff3b3d5c6f1c7ffbc20078bfbac7c2f7f3e00a8c028eb292c82685d1ebd00668
                 Transfer Amount: 1638.015842 USDC
                 Transaction Fee: $143.90485279264487
        -Tranaction with lowest fee:
                 Transaction Hash: 0x30b67d9b1a72c170192dc567d839923d29643a9b2db9dd32c06207a3d1960cda
                 Transfer Amount: 1007.980958 USDC
                 Transaction Fee: $7.221737778877362
        -Highest transaction fee occured at time: 5/5/2023, 1:09:23 PM
        -Lowest transaction fee occured at time: 4/30/2023, 12:48:11 AM
```

- In the overview the following information is printed out to the console:

  - The total number of transactions that occured between the given date range.
  - The transaction that had the highest transaction fee.
  - The transaction that had the lowest transaction fee.
  - The date and time when the both the highest and lowest transaction fees occurred.

  <br />

# Important things to keep in mind

- There may be discrepancies between the transaction fee that is displayed on the console and the actual transaction fee paid, as the calculation of the fee in USD is based on an exchange rate that differs from the one applicable on the date of the transaction. Specifically, the exchange rate used is the rate at the moment overview command is executed. This shouldn't cause major discrepancies when checking recent transactions.

- When running the `overview` command, its important that database contains transactions for the date range specified. Otherwise if a range is specified without adding the transactions using `storeblocks` command first, an error will occur.
