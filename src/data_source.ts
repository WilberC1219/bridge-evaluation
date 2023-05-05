import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
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
