-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2019 at 03:52 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modoo`
--

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `CouponId` varchar(50) NOT NULL,
  `CouponCode` varchar(300) NOT NULL,
  `CouponStart_Date` varchar(100) NOT NULL,
  `CouponEnd_Date` varchar(100) NOT NULL,
  `CouponType` varchar(50) NOT NULL,
  `CouponPorcent` varchar(50) NOT NULL,
  `CouponAmount` varchar(50) NOT NULL,
  `CouponPlatform` varchar(50) NOT NULL,
  `CouponPlan` varchar(50) NOT NULL,
  `CouponStatus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`CouponId`, `CouponCode`, `CouponStart_Date`, `CouponEnd_Date`, `CouponType`, `CouponPorcent`, `CouponAmount`, `CouponPlatform`, `CouponPlan`, `CouponStatus`) VALUES
('1', '2RK6KPGH', '0001-01-01', '0001-01-01', '1', '0', '0', 'T,G', '1,2', '1'),
('2', 'JMGTMX5Y', '2019-12-15', '2019-12-15', '2', '0.2', '1200', 'T,G,C', '1,2,3', '1'),
('3', 'WPDR773L', '2019-12-15', '2019-12-15', '2', '0.2', '1200', 'T,G,C', '1,2,3', '1'),
('4', '91ZLUNTT', '2019-12-15', '2019-12-15', '2', '0.2', '1200', 'T,G,C', '1,2,3', '1'),
('5', 'FIPY0U2F', '2019-12-15', '2019-12-15', '2', '0.2', '1200', 'T,G,C', '1,2,3', '1'),
('6', 'A22FXN7T', '2019-12-15', '2019-12-15', '2', '0.2', '1200', 'T,G,C', '1,2,3', '1'),
('7', '1699XGBR', '2019-12-15', '2019-12-15', '2', '0.2', '1200', 'T,G,C', '1,2,3', '1'),
('8', 'YRJKS7XS', '2019-12-15', '2019-12-15', '2', '0.2', '1200', 'T,G,C', '1,2,3', '1'),
('9', 'IQK04YEW', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2,3', '1'),
('10', 'DC42BF1T', '2019-11-28', '2019-11-29', '1', '10', '1200', 'G', '2', '1'),
('11', 'MP13916L', '2019-11-28', '2019-11-29', '1', '15', '1200', 'T,G,C', '2', '1'),
('12', 'GLAMIAZH', '2019-11-28', '2019-11-30', '1', '14', '1200', 'G,C', '2', '1'),
('13', '07HVBO0O', '2019-11-27', '2019-11-29', '1', '10', '1200', 'G', '2', '1'),
('14', 'FRCUIR40', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('15', 'WMPTVGQQ', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('16', 'T8USX2OD', '2019-11-28', '2019-11-30', '1', '10', '1200', 'C', '2', '1'),
('17', 'MXCD8GS7', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('18', 'YMYSYMCY', '2019-11-25', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('19', 'QK05UGVT', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('20', 'R0BC4H1M', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('21', 'D8HVO12P', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('22', '4R4IS81H', '2019-11-27', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('23', '65BNCSSG', '2019-11-28', '2019-11-30', '1', '10', '1200', 'G', '2', '1'),
('24', 'BTVHEQDR', '2019-11-28', '2019-11-30', '1', '14', '1200', 'T,G', '2,3', '1'),
('25', 'VLOZERJZ', '2019-11-28', '2019-11-30', '1', '98', '1200', 'G,C', '2,3', '1'),
('26', 'SKBCMMAT', '2019-11-21', '2019-11-29', '1', '10', '1200', 'T,G,C', '2,3', '1'),
('27', '5PF4ER9D', '2019-11-28', '2019-11-30', '1', '12', '1200', 'T,C', '2,3', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
