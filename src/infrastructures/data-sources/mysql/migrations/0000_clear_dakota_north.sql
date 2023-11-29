CREATE TABLE `users` (
	`id` varchar(32) NOT NULL,
	`full_name` varchar(64),
	`phone` varchar(18),
	`email` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
