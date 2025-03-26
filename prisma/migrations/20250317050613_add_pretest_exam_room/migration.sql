-- CreateTable
CREATE TABLE "PreTestRoom" (
    "camperId" TEXT NOT NULL,
    "examNumber" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "examLocation" TEXT NOT NULL,

    CONSTRAINT "PreTestRoom_pkey" PRIMARY KEY ("camperId")
);

-- AddForeignKey
ALTER TABLE "PreTestRoom" ADD CONSTRAINT "PreTestRoom_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Camper"("camperId") ON DELETE RESTRICT ON UPDATE CASCADE;
