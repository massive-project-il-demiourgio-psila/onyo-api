CREATE TABLE `booking_details` (
	`id` varchar(32) NOT NULL,
	`booking_id` varchar(32) NOT NULL,
	`on_behalf_of_name` varchar(72),
	`on_behalf_of_phone` varchar(18),
	`on_behalf_of_email` varchar(128),
	`pick_up_location` varchar(72),
	`drop_off_location` varchar(72),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `booking_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(32) NOT NULL,
	`vehicle_id` varchar(32) NOT NULL,
	`invoice_id` varchar(32) NOT NULL,
	`driver_id` varchar(32),
	`start_at` datetime NOT NULL,
	`end_at` datetime NOT NULL,
	`amount` int NOT NULL,
	`additional_driver_amount` int,
	`total_amount` int,
	`reason_cancelled` varchar(255),
	`status` varchar(128),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` varchar(32) NOT NULL,
	`trx_id` varchar(128) NOT NULL,
	`external_trx_id` varchar(128),
	`external_id` varchar(128),
	`amount` int NOT NULL,
	`payment_type` varchar(32),
	`payment_channel` varchar(32),
	`payment_link` varchar(32),
	`expired_at` datetime,
	`account_number` varchar(64),
	`account_name` varchar(128),
	`note` varchar(255),
	`status` varchar(128),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(32) NOT NULL,
	`booking_id` varchar(32) NOT NULL,
	`vehicle_id` varchar(32),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drivers` (
	`id` varchar(32) NOT NULL,
	`full_name` varchar(64) NOT NULL,
	`phone_number` varchar(18) NOT NULL,
	`is_verified` boolean NOT NULL DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `drivers_id` PRIMARY KEY(`id`),
	CONSTRAINT `drivers_phone_number_unique` UNIQUE(`phone_number`)
);
--> statement-breakpoint
ALTER TABLE `permissions` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `permissions` MODIFY COLUMN `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `roles` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `roles` MODIFY COLUMN `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `role_permissions` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `role_permissions` MODIFY COLUMN `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `user_profiles` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user_profiles` MODIFY COLUMN `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `user_roles` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user_roles` MODIFY COLUMN `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `user_permissions` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user_permissions` MODIFY COLUMN `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `vehicles` MODIFY COLUMN `extra_attributes` json DEFAULT ('{"color":null,"noOfDoors":0,"noOfAirbags":0,"noOfGears":0}');--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified_at` datetime;--> statement-breakpoint
ALTER TABLE `users` ADD `phone_verified_at` datetime;--> statement-breakpoint
ALTER TABLE `booking_details` ADD CONSTRAINT `booking_details_booking_id_bookings_id_fk` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_vehicle_id_vehicles_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_invoice_id_invoices_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_driver_id_drivers_id_fk` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_booking_id_bookings_id_fk` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_vehicle_id_vehicles_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE cascade ON UPDATE cascade;