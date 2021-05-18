CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
    `id` bigint(20) unsigned AUTO_INCREMENT,
    `start_date` datetime NOT NULL,
    `end_date` datetime NOT NULL,
    `text` varchar(255) DEFAULT NULL,
    `room_id` int DEFAULT NULL,
    `owner_id` int DEFAULT NULL,
    PRIMARY KEY (`id`)
);
/**add additional tables*/
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
    `key` int DEFAULT null,
    `label` varchar(255) DEFAULT null
);
DROP TABLE IF EXISTS `owners`;
CREATE TABLE `owners` (
    `key` int DEFAULT null,
    `label` varchar(255) DEFAULT null
);

/*add info to tables*/
INSERT INTO `events` (`id`, `start_date`,`end_date`,  `text`, `room_id`, `owner_id`) VALUES (1, "20210812", "20210612", "test",0 ,0);
INSERT INTO `events` (`id`, `start_date`,`end_date`,  `text`, `room_id`, `owner_id`) VALUES (2, "20210813", "20210613", "test1",0 ,0);

INSERT INTO `rooms` (`key`, `label`) VALUES (1, "Room1");
INSERT INTO `rooms`  (`key`, `label`) VALUES (2, "Room2");

INSERT INTO `owners` (`key`, `label`) VALUES (1, "Alex");
INSERT INTO `owners` (`key`, `label`) VALUES (2, "Gomer");
