/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum("user_role")` to `Enum("User_role")`.
  - You are about to drop the `dayplan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `destination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tourservice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `dayplan` DROP FOREIGN KEY `DayPlan_planId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_destinationID_fkey`;

-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_tourId_fkey`;

-- DropForeignKey
ALTER TABLE `plan` DROP FOREIGN KEY `Plan_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_tourId_fkey`;

-- DropForeignKey
ALTER TABLE `tour` DROP FOREIGN KEY `Tour_planId_fkey`;

-- DropForeignKey
ALTER TABLE `tourservice` DROP FOREIGN KEY `TourService_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `tourservice` DROP FOREIGN KEY `TourService_tourId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('STUDENT', 'TEACHER', 'MANAGER') NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE `dayplan`;

-- DropTable
DROP TABLE `destination`;

-- DropTable
DROP TABLE `image`;

-- DropTable
DROP TABLE `invoice`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `plan`;

-- DropTable
DROP TABLE `review`;

-- DropTable
DROP TABLE `service`;

-- DropTable
DROP TABLE `tour`;

-- DropTable
DROP TABLE `tourservice`;

-- CreateTable
CREATE TABLE `Course` (
    `key` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCourse` (
    `userId` INTEGER NOT NULL,
    `courceKey` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `courceKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lesson` (
    `key` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `courseKey` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `key` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `courseKey` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_courceKey_fkey` FOREIGN KEY (`courceKey`) REFERENCES `Course`(`key`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_courseKey_fkey` FOREIGN KEY (`courseKey`) REFERENCES `Course`(`key`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_courseKey_fkey` FOREIGN KEY (`courseKey`) REFERENCES `Course`(`key`) ON DELETE CASCADE ON UPDATE CASCADE;
