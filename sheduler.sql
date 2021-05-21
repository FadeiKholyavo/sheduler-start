CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;

CREATE TABLE IF NOT EXISTS `rooms` (
    `key` int NOT NULL,
    `label` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`key`)
);
CREATE TABLE IF NOT EXISTS `owners` (
    `key` int NOT NULL,
    `label` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`key`)
);
CREATE TABLE IF NOT EXISTS `events` (
    `id` bigint(20) unsigned AUTO_INCREMENT,
    `start_date` datetime NOT NULL,
    `end_date` datetime NOT NULL,
    `text` varchar(255) DEFAULT NULL,
    `room_id` int DEFAULT NULL,
    `owner_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`room_id`) REFERENCES `rooms`(`key`),
    FOREIGN KEY (`owner_id`) REFERENCES `owners`(`key`)
);
/*add info to tables*/
INSERT INTO `rooms` (`key`, `label`) VALUES (1, "Room1");
INSERT INTO `rooms`  (`key`, `label`) VALUES (2, "Room2");

INSERT INTO `owners` (`key`, `label`) VALUES (1, "Alex");
INSERT INTO `owners` (`key`, `label`) VALUES (2, "Gomer");

INSERT INTO `events` (`id`, `start_date`,`end_date`,  `text`, `room_id`, `owner_id`) VALUES (1, curdate(), curdate(), "test",1 ,1);
INSERT INTO `events` (`id`, `start_date`,`end_date`,  `text`, `room_id`, `owner_id`) VALUES (2, curdate(), curdate(), "test1",2 ,2);
INSERT INTO `events` (`id`, `start_date`,`end_date`,  `text`, `room_id`, `owner_id`) VALUES (3, curdate(), curdate(), "test1",null ,null);