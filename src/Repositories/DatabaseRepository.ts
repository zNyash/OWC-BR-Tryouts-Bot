import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { Logger } from "../utils/Logger";

const SQL3 = sqlite3.verbose();

export class DatabaseRepository {
    private static db: Database | null = null;

    public static async GetConnection(): Promise<Database> {
        if (this.db === null) {
            Logger.Info("Creating a new database connection");
            const DB_PATH = path.resolve(__dirname + "/../Database/dev.db");

            try {
                this.db = await open({
                    filename: DB_PATH,
                    driver: sqlite3.Database
                });
                
                Logger.Success("Database connection created");

            } catch (error) {
                Logger.Error(error);
                throw error;
            }
        }

        return this.db;
    }
}
