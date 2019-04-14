-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2019-04-14 17:01:36
-- 服务器版本： 10.1.36-MariaDB
-- PHP 版本： 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `bbt`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('admin', 'ILikeBBT2333333');

-- --------------------------------------------------------

--
-- 表的结构 `college`
--

CREATE TABLE `college` (
  `college` text NOT NULL,
  `type` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `college`
--

INSERT INTO `college` (`college`, `type`, `id`) VALUES
('机械与汽车工程学院', 2, 1),
('建筑学院', 3, 2),
('土木与交通学院', 2, 3),
('电子与信息学院', 2, 4),
('材料科学与工程学院', 2, 5),
('化学与化工学院', 2, 6),
('轻工科学与工程学院', 2, 7),
('食品科学与工程学院', 2, 8),
('数学学院', 2, 9),
('物理与光电学院', 2, 10),
('经济与贸易学院', 1, 11),
('自动化科学与工程学院', 2, 12),
('计算机科学与工程学院', 1, 13),
('电力学院', 2, 14),
('生物科学与工程学院', 1, 15),
('环境与能源学院', 1, 16),
('软件学院', 1, 17),
('工商管理学院', 3, 18),
('公共管理学院', 1, 19),
('马克思主义学院', 0, 20),
('外国语学院', 1, 21),
('法学院', 1, 22),
('新闻与传播学院', 1, 23),
('艺术学院', 1, 24),
('体育学院', 3, 25),
('设计学院', 1, 26),
('医学院', 1, 27),
('国际教育学院', 0, 28);

-- --------------------------------------------------------

--
-- 表的结构 `department`
--

CREATE TABLE `department` (
  `department` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `department`
--

INSERT INTO `department` (`department`, `id`) VALUES
('行政部', 0),
('人力资源部', 1),
('综合新闻部', 2),
('频道资讯部', 3),
('视频部', 4),
('市场拓展部', 5),
('形象推广部', 6),
('技术部', 7),
('视觉设计部', 8),
('节目部', 9),
('策划推广部', 10),
('综合管理部', 11),
('外联部', 12),
('编辑部', 13);

-- --------------------------------------------------------

--
-- 表的结构 `information`
--

CREATE TABLE `information` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `gender` text NOT NULL,
  `grade` text NOT NULL,
  `type` text NOT NULL,
  `college` text NOT NULL,
  `dormitory` text NOT NULL,
  `phone` text NOT NULL,
  `first` text NOT NULL,
  `second` text NOT NULL,
  `adjust` text NOT NULL,
  `introduction` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转储表的索引
--

--
-- 表的索引 `college`
--
ALTER TABLE `college`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `college`
--
ALTER TABLE `college`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用表AUTO_INCREMENT `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- 使用表AUTO_INCREMENT `information`
--
ALTER TABLE `information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
