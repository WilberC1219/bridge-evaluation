# Bridge-Evaluation

## Description

Bridge-Evaluation is program that can generate a brief summary of USDC transactions involving Stargate over a specified date range.

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

3. After completing steps 1 and 2, start up the Docker application run the following command in your command line interface while in the root directory of Bridge-Evaluation.

```bash
docker-compose up -d
```

4. Connect to your postgresql database using pgadmin by navigating to localhost:5001 and sign in using credentials in the `compose.yml` file (email: admin@admin.com and password: root)

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
