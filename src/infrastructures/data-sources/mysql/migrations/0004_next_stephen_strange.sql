RENAME TABLE `vehicle_brands` TO `vehicle_makes`;--> statement-breakpoint
ALTER TABLE `vehicles` RENAME COLUMN `brand_id` TO `make_id`;--> statement-breakpoint
ALTER TABLE `vehicle_models` DROP FOREIGN KEY `vehicle_models_make_id_vehicle_brands_id_fk`;
--> statement-breakpoint
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_brand_id_vehicle_brands_id_fk`;
--> statement-breakpoint
ALTER TABLE `vehicles` MODIFY COLUMN `make_id` varchar(32);--> statement-breakpoint
ALTER TABLE `fuel_types` ADD `category` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `vehicle_classifications` ADD `abbrv` varchar(24);--> statement-breakpoint
ALTER TABLE `vehicle_models` ADD CONSTRAINT `vehicle_models_make_id_vehicle_makes_id_fk` FOREIGN KEY (`make_id`) REFERENCES `vehicle_makes`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_make_id_vehicle_makes_id_fk` FOREIGN KEY (`make_id`) REFERENCES `vehicle_makes`(`id`) ON DELETE cascade ON UPDATE cascade;