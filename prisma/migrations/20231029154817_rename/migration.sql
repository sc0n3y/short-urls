/*
  Warnings:

  - You are about to drop the column `original_url` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `short_code` on the `links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `links_short_code_key` ON `links`;

-- AlterTable
ALTER TABLE `links` DROP COLUMN `original_url`,
    DROP COLUMN `short_code`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `links_code_key` ON `links`(`code`);
