/*
  Warnings:

  - You are about to drop the `deleted_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "deleted_user";

-- CreateTable
CREATE TABLE "deleted_users" (
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "deleted_users_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "deleted_users_email_key" ON "deleted_users"("email");
