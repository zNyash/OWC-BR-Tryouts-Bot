import { Logger } from "../../utils/Logger";
import { DatabaseRepository } from "./DatabaseRepository";

export class SchedulesRepository {
    
    public static async Create(user: string, date_timestamp: number) {
        try {
            const DB = await DatabaseRepository.GetConnection();

            Logger.Info(`Inserting a new lobby schedule for user ${user}`);

            const result = await DB.run("INSERT INTO SCHEDULES (PLAYER, SCHEDULE_TIMESTAMP) VALUES (:p, :st)", 
                {
                    ":p": user,
                    ":st": date_timestamp
                }
            )
            
            Logger.Success(`New lobby scheduled for user ${user}`);
            return result;

        } catch (error) {
            Logger.Error(error);

            throw error;
        }

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