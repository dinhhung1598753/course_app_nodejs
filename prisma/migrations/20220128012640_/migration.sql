/*
  Warnings:

  - You are about to drop the column `identityNumber` on the `user` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `teacherId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `identityNumber`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
