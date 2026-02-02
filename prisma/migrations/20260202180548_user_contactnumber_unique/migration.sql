/*
  Warnings:

  - A unique constraint covering the columns `[contactNumber]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNumber]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNumber]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "contactNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "admins_contactNumber_key" ON "admins"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_contactNumber_key" ON "doctors"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "patients_contactNumber_key" ON "patients"("contactNumber");
