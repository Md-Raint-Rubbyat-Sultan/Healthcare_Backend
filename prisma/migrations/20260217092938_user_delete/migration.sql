-- CreateTable
CREATE TABLE "deleted_user" (
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "deleted_user_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "deleted_user_email_key" ON "deleted_user"("email");
