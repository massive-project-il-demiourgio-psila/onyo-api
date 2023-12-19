ALTER TABLE `invoices` RENAME COLUMN `account_number` TO `receipt`;--> statement-breakpoint
ALTER TABLE `invoices` MODIFY COLUMN `receipt` varchar(255);