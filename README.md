# Bridge-Evaluation

## Description

Bridge-Evaluation is program that can generate a brief summary of USDC transactions involving Stargate over a specified date range.

## Setup

##### Clone the repo to your local machine

```bash
gs npm run start
```

```
bridge-evaluation % npm run start

> bridge-evaluation@1.0.0 start
> npm run build && node ./build/src/index.js


> bridge-evaluation@1.0.0 build
> rimraf ./build && tsc

Starting server
[Success] DB is connected
Searching for any new transactions since block 17189721
bridge-evaluation % npm run start

> bridge-evaluation@1.0.0 start
> npm run build && node ./build/src/index.js


> bridge-evaluation@1.0.0 build
> rimraf ./build && tsc

Starting server
[Success] DB is connected
Searching for any new transactions since block 17189721
Added 0 transactions to the database

Enter a command: overview start:2023-04-30 end:2023-05-02

Transaction overview for 2023-04-30 to 2023-05-02:
        -Total number of transactions: 297
        -Tranaction with highest fee:
                 Transaction Hash: 0x191ad76425ba96e622d014e5d0a6d61ebcc6cbc24d9c99c7c287487fe9eeaf9d
                 Transfer Amount: 199.641865 USDC
                 Transaction Fee: $101.35604811416293
        -Tranaction with lowest fee:
                 Transaction Hash: 0x30b67d9b1a72c170192dc567d839923d29643a9b2db9dd32c06207a3d1960cda
                 Transfer Amount: 1007.980958 USDC
                 Transaction Fee: $6.843351950142943
        -Highest transaction fee occured at time: 5/2/2023, 10:49:59 AM
        -Lowest transaction fee occured at time: 4/30/2023, 12:48:11 AM

Enter a command:
```
