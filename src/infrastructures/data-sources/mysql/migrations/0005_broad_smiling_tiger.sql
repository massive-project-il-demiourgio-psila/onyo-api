CREATE TABLE `auth_tokens` (
	`token` text NOT NULL,
	`user_id` varchar(32),
	`expire_at` timestamp
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `vehicle_classifications` DROP COLUMN `slug`;