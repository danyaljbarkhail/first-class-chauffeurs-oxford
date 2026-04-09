CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pickupLocation` varchar(255) NOT NULL,
	`dropoffLocation` varchar(255) NOT NULL,
	`bookingDate` varchar(10) NOT NULL,
	`bookingTime` varchar(5) NOT NULL,
	`passengers` int NOT NULL DEFAULT 1,
	`serviceType` enum('one-way','return','hourly') NOT NULL DEFAULT 'one-way',
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`specialRequests` text,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`estimatedPrice` decimal(10,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','read','responded') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`respondedAt` timestamp,
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
