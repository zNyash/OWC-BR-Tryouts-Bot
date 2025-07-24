import { prisma } from "../lib/prisma";
import { Logger } from "../utils/Logger";

export class LobbiesRepository {

    public static async Create(user: string, date_timestamp: bigint) {
        Logger.Info(`Inserting a new lobby schedule for user ${user}`);

        try{
            const lobby = await prisma.lobbies.create({
                data: {
                    player: user,
                    date: date_timestamp
                }
            });

            Logger.Success("New lobby inserted")

            return lobby;
        }
        catch(error) {
            Logger.Error(error);
            
            return null;
        }
    }

    public static async Get(user: string) {
        Logger.Info(`Fetching a lobby for user ${user}`);

        const lobby = await prisma.lobbies.findUnique({
            where: {
                player: user
            }
        });

        return lobby;
    }

    public static async Update(user: string, date_timestamp: bigint) {
        Logger.Info(`Updating lobby schedule for user ${user}`);

        try{
            const lobby = await prisma.lobbies.update({
                where: {
                    player: user
                },
                data: {
                    date: date_timestamp
                }
            });

            Logger.Success("Lobby updated")

            return lobby;
        }
        catch(error) {
            Logger.Error(error);
            
            return null;
        } 
    }
}