/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `pid` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "pid",
ADD COLUMN     "pid" SERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("pid");
