/*
  Warnings:

  - The `attendance` column on the `Result` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Result" DROP COLUMN "attendance",
ADD COLUMN     "attendance" JSONB;
