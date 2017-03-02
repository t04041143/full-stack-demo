/*
Navicat MySQL Data Transfer

Source Server         : lecity123.net
Source Server Version : 50622
Source Host           : www.lecity123.net:3306
Source Database       : u1

Target Server Type    : MYSQL
Target Server Version : 50622
File Encoding         : 65001

Date: 2016-09-05 14:21:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for auth_item
-- ----------------------------
DROP TABLE IF EXISTS `auth_item`;
CREATE TABLE `auth_item` (
  `name` varchar(64) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `weight` mediumint(9) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `description` text,
  `createAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for auth_item_child
-- ----------------------------
DROP TABLE IF EXISTS `auth_item_child`;
CREATE TABLE `auth_item_child` (
  `parent` varchar(64) NOT NULL,
  `child` varchar(64) NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hashedPassword` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `profileId` int(11) DEFAULT NULL,
  `financeId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1000000 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_certificate
-- ----------------------------
DROP TABLE IF EXISTS `user_certificate`;
CREATE TABLE `user_certificate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned NOT NULL,
  `type` int(11) NOT NULL,
  `number` varchar(100) NOT NULL,
  `images` longtext,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_certificate` (`uid`,`type`,`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_finance_account
-- ----------------------------
DROP TABLE IF EXISTS `user_finance_account`;
CREATE TABLE `user_finance_account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned DEFAULT NULL,
  `balance` int(11) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_finance` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_grant
-- ----------------------------
DROP TABLE IF EXISTS `user_grant`;
CREATE TABLE `user_grant` (
  `uid` int(10) unsigned NOT NULL,
  `authName` varchar(64) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`authName`,`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_identification
-- ----------------------------
DROP TABLE IF EXISTS `user_identification`;
CREATE TABLE `user_identification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned NOT NULL,
  `type` int(11) NOT NULL,
  `flag` varchar(70) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_identity` (`type`,`flag`),
  KEY `user_identity` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_profile
-- ----------------------------
DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE `user_profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned NOT NULL,
  `realName` varchar(15) DEFAULT NULL,
  `portraitUrl` varchar(255) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`),
  KEY `user_profile` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
