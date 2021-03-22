/*
  Warnings:

  - You are about to drop the column `pricture` on the `Event` table. All the data in the column will be lost.
  - Added the required column `picture` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "pricture",
ADD COLUMN     "picture" TEXT NOT NULL;
