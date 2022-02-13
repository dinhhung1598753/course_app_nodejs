/*
  Warnings:

  - You are about to drop the `document` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `videoId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progess` to the `UserCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_courseKey_fkey`;

-- AlterTable
ALTER TABLE `lesson` ADD COLUMN `videoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usercourse` ADD COLUMN `progess` INTEGER NOT NULL;

-- DropTable
DROP TABLE `document`;
