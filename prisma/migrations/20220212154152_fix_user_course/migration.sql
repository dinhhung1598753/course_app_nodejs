/*
  Warnings:

  - The primary key for the `usercourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courceKey` on the `usercourse` table. All the data in the column will be lost.
  - Added the required column `courseKey` to the `UserCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usercourse` DROP FOREIGN KEY `UserCourse_courceKey_fkey`;

-- AlterTable
ALTER TABLE `usercourse` DROP PRIMARY KEY,
    DROP COLUMN `courceKey`,
    ADD COLUMN `courseKey` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `courseKey`);

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_courseKey_fkey` FOREIGN KEY (`courseKey`) REFERENCES `Course`(`key`) ON DELETE CASCADE ON UPDATE CASCADE;
