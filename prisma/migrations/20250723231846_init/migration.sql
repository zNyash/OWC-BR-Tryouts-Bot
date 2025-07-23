-- CreateTable
CREATE TABLE "Lobbies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player" TEXT NOT NULL,
    "date" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Lobbies_player_key" ON "Lobbies"("player");
