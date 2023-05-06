"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 3000,
    username: "username",
    password: "password",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: [__dirname + "/data/*.{js,ts}"],
    subscribers: [],
    migrations: [__dirname + "/migrations/*.{js,ts}"],
});
