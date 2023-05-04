#Description
Bridge-Evaluation is program that can generate a brief summary of USDC transactions involving Stargate over a specified date range.

```
bridge-evaluation % npm run start

> bridge-evaluation@1.0.0 start
> npm run build && node ./build/src/index.js


> bridge-evaluation@1.0.0 build
> rimraf ./build && tsc

Starting server
[Success] DB is connected
Searching for any new transactions since block 17189721
Added 0 transactions to the database

Enter a command:
```
