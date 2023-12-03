CREATE TABLE `permissions` (
	`id` varchar(32) NOT NULL,
	`can` varchar(16) NOT NULL,
	`resource` varchar(32) NOT NULL,
	`created_at` datetime,
	`updated_at` datetime,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` varchar(128),
	`label` varchar(24) NOT NULL,
	`type` varchar(24),
	`created_at` datetime,
	`updated_at` datetime,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` varchar(32) NOT NULL,
	`role_id` varchar(32) NOT NULL,
	`permission_id` varchar(32) NOT NULL,
	`created_at` datetime,
	`updated_at` datetime,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `role_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(32) NOT NULL,
	`picture` varchar(512),
	`address` text,
	`created_at` datetime,
	`updated_at` datetime,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(32) NOT NULL,
	`role_id` varchar(32) NOT NULL,
	`created_at` datetime,
	`updated_at` datetime,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(32) NOT NULL,
	`full_name` varchar(64) NOT NULL,
	`email` varchar(128) NOT NULL,
	`password` varchar(72) NOT NULL,
	`phone_number` varchar(18) NOT NULL,
	`dob` date NOT NULL,
	`gender` varchar(128) NOT NULL,
	`created_at` datetime,
	`updated_at` datetime,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	`is_deleted` boolean DEFAULT false,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_unique_idx` UNIQUE(`email`),
	CONSTRAINT `phone_unique_idx` UNIQUE(`phone_number`)
);
--> statement-breakpoint
CREATE TABLE `user_permissions` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(32) NOT NULL,
	`permission_id` varchar(32) NOT NULL,
	`created_at` datetime,
	`updated_at` datetime,
	`created_by` varchar(128) DEFAULT 'system',
	`updated_by` varchar(128) DEFAULT 'system',
	CONSTRAINT `user_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `dob_idx` ON `users` (`dob`);--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE cascade;