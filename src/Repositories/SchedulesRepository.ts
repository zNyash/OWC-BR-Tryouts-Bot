import { Logger } from "../utils/Logger";

export class SchedulesRepository {

    public static async Create(user: string, date_timestamp: bigint) {
        Logger.Info(`Inserting a new lobby schedule for user ${user}`);
        // TODO
    }

    public static async Get(user: string) {
        Logger.Info(`Fetching a lobby for user ${user}`);
        // TODO
    }

    public static async Update(user: string, date_timestamp: bigint) {
        Logger.Info(`Updating lobby schedule for user ${user}`);
        // TODO
    }
}