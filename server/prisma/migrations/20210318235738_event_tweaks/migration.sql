/*
  Warnings:

  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 1;
