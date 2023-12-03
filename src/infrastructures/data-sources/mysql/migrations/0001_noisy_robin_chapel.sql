ALTER TABLE `users` DROP CONSTRAINT `email_unique_idx`;--> statement-breakpoint
ALTER TABLE `users` DROP CONSTRAINT `phone_unique_idx`;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_phone_number_unique` UNIQUE(`phone_number`);