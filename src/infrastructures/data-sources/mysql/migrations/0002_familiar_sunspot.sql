CREATE TABLE `fuel_types` (
	`id` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` varchar(255) NOT NULL,
	CONSTRAINT `fuel_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicle_classifications` (
	`id` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` varchar(255) NOT NULL,
	`slug` varchar(32) NOT NULL,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `vehicle_classifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicle_brands` (
	`id` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	`slug` varchar(32) NOT NULL,
	`logo` text,
	`vehicle_count` int DEFAULT 0,
	`vehicle_model_count` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `vehicle_brands_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicle_models` (
	`id` varchar(32) NOT NULL,
	`make_id` varchar(32),
	`name` varchar(32) NOT NULL,
	`slug` varchar(32) NOT NULL,
	`vehicle_count` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `vehicle_models_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` varchar(32) NOT NULL,
	`brand_id` varchar(32) NOT NULL,
	`classification_id` varchar(32) NOT NULL,
	`model_id` varchar(32) NOT NULL,
	`fuel_type_id` varchar(32) NOT NULL,
	`per_day_amount` int,
	`per_hour_amount` int,
	`transmission` varchar(24) NOT NULL DEFAULT 'automatic',
	`no_of_seats` int NOT NULL DEFAULT 2,
	`year` year,
	`license_plate` varchar(12),
	`availability` varchar(12) NOT NULL DEFAULT 'maintenance',
	`air_conditioner` int,
	`extra_attributes` json DEFAULT ('{"color":null,"noOfDoors":0,"noOfAirbags":0,"noOfGears":0,"odometerReading":0}'),
	CONSTRAINT `vehicles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `vehicle_models` ADD CONSTRAINT `vehicle_models_make_id_vehicle_brands_id_fk` FOREIGN KEY (`make_id`) REFERENCES `vehicle_brands`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_brand_id_vehicle_brands_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `vehicle_brands`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_classification_id_vehicle_classifications_id_fk` FOREIGN KEY (`classification_id`) REFERENCES `vehicle_classifications`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_model_id_vehicle_models_id_fk` FOREIGN KEY (`model_id`) REFERENCES `vehicle_models`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_fuel_type_id_fuel_types_id_fk` FOREIGN KEY (`fuel_type_id`) REFERENCES `fuel_types`(`id`) ON DELETE cascade ON UPDATE cascade;