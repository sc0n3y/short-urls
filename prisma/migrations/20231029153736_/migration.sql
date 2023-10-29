/*
  Warnings:

  - You are about to drop the column `originalUrl` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `shortCode` on the `links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_code]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `original_url` to the `links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_code` to the `links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `links_shortCode_key` ON `links`;

-- AlterTable
ALTER TABLE `links` DROP COLUMN `originalUrl`,
    DROP COLUMN `shortCode`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `original_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `short_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `links_short_code_key` ON `links`(`short_code`);
