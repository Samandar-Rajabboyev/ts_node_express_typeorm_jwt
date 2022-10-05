import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "./entity/todo";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "test_db_for_typeorm",
  synchronize: false,
  logging: true,
  entities: [User, Todo],
  migrations: [],
  subscribers: [],
});
