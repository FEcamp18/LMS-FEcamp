-- CreateTable
CREATE TABLE "ResetPassTable" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPassTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassTable_token_key" ON "ResetPassTable"("token");

-- AddForeignKey
ALTER TABLE "ResetPassTable" ADD CONSTRAINT "ResetPassTable_username_fkey" FOREIGN KEY ("username") REFERENCES "Account"("username") ON DELETE CASCADE ON UPDATE CASCADE;
