ALTER TABLE `drivers` RENAME COLUMN `is_verified` TO `ktp_verified_at`;--> statement-breakpoint
ALTER TABLE `drivers` DROP CONSTRAINT `drivers_phone_number_unique`;--> statement-breakpoint
ALTER TABLE `vehicle_makes` MODIFY COLUMN `logo` varchar(256);--> statement-breakpoint
ALTER TABLE `drivers` MODIFY COLUMN `ktp_verified_at` datetime;--> statement-breakpoint
ALTER TABLE `vehicle_models` ADD `reference_image_path` varchar(256);--> statement-breakpoint
ALTER TABLE `vehicles` ADD `image_path` varchar(512);--> statement-breakpoint
ALTER TABLE `vehicles` ADD `images` json DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `bookings` ADD `code` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `drivers` ADD `email` varchar(256);--> statement-breakpoint
ALTER TABLE `drivers` ADD `sim_verified_at` datetime;