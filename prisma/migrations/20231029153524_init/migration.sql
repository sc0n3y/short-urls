-- CreateTable
CREATE TABLE `links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `shortCode` VARCHAR(191) NOT NULL,
    `originalUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `links_shortCode_key`(`shortCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
