-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myapp
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessory`
--

DROP TABLE IF EXISTS `accessory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessory`
--

LOCK TABLES `accessory` WRITE;
/*!40000 ALTER TABLE `accessory` DISABLE KEYS */;
INSERT INTO `accessory` VALUES (1,'Áo Polo Vinfast VF5 Thêu Hoa',350000,'images/accessory/Áo Polo Vinfast VF 5 Thêu Hoa.jpg'),(2,'Bọc vô lăng VF3',250000,'images/accessory/Bọc vô lăng VF 3.jpg'),(3,'Bộ thanh ngang giá nóc VF3',1200000,'images/accessory/Bộ thanh ngang giá nóc VF 3.jpg'),(4,'Camera lùi VF3',900000,'images/accessory/Camera lùi VF 3.jpg'),(5,'Gói film cách nhiệt dán trần Vinfast VF7',1500000,'images/accessory/Gói Film cách nhiệt dán trần Vinfast VF 7.jpg'),(6,'Khăn lụa cao cấp Vinfast',300000,'images/accessory/Khăn lụa cao cấp Vinfast.jpg'),(7,'Mô hình xe Vinfast VF3',450000,'images/accessory/Mô hình xe Vinfast VF3.jpg'),(8,'Mũ lưỡi trai thêu hoa VF5',200000,'images/accessory/Mũ lưỡi trai thêu hoa VF 5.jpg'),(9,'Sạc tại nhà 3KW',3500000,'images/accessory/Sạc tại nhà 3KW.jpg'),(10,'Tấm che pin cao áp Vinfast Nerio Green',600000,'images/accessory/Tấm che pin cao áp Vinfast Nerio Green.jpg'),(11,'Thanh ngang giá nóc Vinfast VF8',1400000,'images/accessory/Thanh ngang giá nóc Vinfast VF 8.jpg'),(12,'VF5 Tấm che pin cao áp',500000,'images/accessory/VF 5 Tấm che pin cao áp.jpg'),(13,'VF6 Tấm che pin cao áp',520000,'images/accessory/VF 6 Tấm che pin cao áp.jpg'),(14,'VF7 Tấm che pin cao áp',540000,'images/accessory/VF 7 Tấm Che Pin Cao Áp.jpg'),(15,'VF8 Tấm che pin cao áp',560000,'images/accessory/VF 8 Tấm che pin cao áp.jpg'),(16,'VF9 Tấm che pin cao áp',600000,'images/accessory/VF 9 Tấm che pin cao áp.jpg'),(17,'Bình giữ nhiệt VF7',180000,'images/accessory/Bình giữ nhiệt VF 7.jpg');
/*!40000 ALTER TABLE `accessory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_car_category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'Vinfast EC Van',285000000,'car/Vinfast EC Van.jpg','dong_xe_dich_vu'),(2,'Vinfast Fadil',425000000,'car/Vinfast Fadil.jpg','dong_co_xang'),(3,'Vinfast Herio Green',499000000,'car/Vinfast Herio Green.jpg','dong_xe_dich_vu'),(4,'Vinfast Limo Green',749000000,'car/Vinfast Limo Green.jpg','dong_xe_dich_vu'),(5,'Vinfast Lux A2.0',1150000000,'car/VinFast Lux A20.jpg','dong_co_xang'),(6,'Vinfast Lux SA2.0',1500000000,'car/Vinfast Lux SA20.jpg','dong_co_xang'),(7,'Vinfast Minio Green',269000000,'car/Vinfast Minio Green.jpg','dong_xe_dich_vu'),(8,'Vinfast Nerio Green',369000000,'car/Vinfast Nerio Green.jpg','dong_xe_dich_vu'),(9,'Vinfast President',4600000000,'car/Vinfast President.jpg','dong_co_xang'),(10,'Vinfast VF MPV 7',1120000000,'car/Vinfast VF MPV 7.jpg','dong_co_dien'),(11,'Vinfast VF3',235000000,'car/Vinfast VF3.jpg','dong_co_dien'),(12,'Vinfast VF5',458000000,'car/Vinfast VF5.jpg','dong_co_dien'),(13,'Vinfast VF6',675000000,'car/Vinfast VF6.jpg','dong_co_dien'),(14,'Vinfast VF7',850000000,'car/Vinfast VF7.jpg','dong_co_dien'),(15,'Vinfast VF8',1120000000,'car/Vinfast VF8.jpg','dong_co_dien'),(16,'Vinfast VF9',1499000000,'car/Vinfast VF9.jpg','dong_co_dien');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `color_id` int DEFAULT NULL,
  `color_name` varchar(50) DEFAULT NULL,
  `color_value` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_cart_item` (`user_id`,`product_id`,`color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (54,'b','1','VinFast Evo 200 Lite',22000000,'motorbike/VinFast%20Evo%20200%20Lite.jpg',1,'2026-04-17 09:34:17','2026-04-17 09:34:17',1,'Trắng','#FFFFFF');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `color` varchar(20) NOT NULL,
  `route` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Special Voucher','special','#F97316','category_special',NULL,1),(2,'Phổ Thông',NULL,'#F5E6D3','category_pho_thong','home/phothong.png',2),(3,'Trung Cấp',NULL,'#FFE5E5','category_trung_cap','home/trungcap.png',3),(4,'Cao Cấp',NULL,'#FFF8F0','category_cao_cap','home/caocap.png',4),(5,'Ô Tô',NULL,'#FFF8E7','category_o_to','home/oto.png',5),(6,'Phụ Kiện',NULL,'#F0FFF0','category_phu_kien','home/phukien.png',6);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consults`
--

DROP TABLE IF EXISTS `consults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `car_type` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consults`
--

LOCK TABLES `consults` WRITE;
/*!40000 ALTER TABLE `consults` DISABLE KEYS */;
INSERT INTO `consults` VALUES (1,'Thang2s','0388309023','Hshsjs','Cao cấp','2026-03-16 03:17:57');
/*!40000 ALTER TABLE `consults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motorbike`
--

DROP TABLE IF EXISTS `motorbike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motorbike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motorbike`
--

LOCK TABLES `motorbike` WRITE;
/*!40000 ALTER TABLE `motorbike` DISABLE KEYS */;
INSERT INTO `motorbike` VALUES (1,'VinFast Evo 200 Lite',22000000,'motorbike/VinFast Evo 200 Lite.jpg','pho_thong',0),(2,'VinFast Evo 200',22000000,'motorbike/VinFast Evo 200.jpg','pho_thong',0),(3,'VinFast Evo Grand Lite',22000000,'motorbike/VinFast Evo Grand Lite.png','pho_thong',0),(4,'VinFast Evo Grand',22000000,'motorbike/VinFast Evo Grand.jpg','pho_thong',0),(5,'Vinfast Evo Lite Neo',22000000,'motorbike/Vinfast Evo Lite Neo.jpg','pho_thong',0),(6,'VinFast Evo Neo',22000000,'motorbike/VinFast Evo Neo.jpg','pho_thong',0),(7,'VinFast Evo',22000000,'motorbike/VinFast Evo.jpg','pho_thong',1),(8,'VinFast Feliz 2025',30000000,'motorbike/VinFast Feliz 2025.jpg','trung_cap',0),(9,'VinFast Feliz II',30000000,'motorbike/VinFast Feliz II.png','trung_cap',0),(10,'VinFast Feliz Lite',30000000,'motorbike/VinFast Feliz Lite.png','trung_cap',0),(11,'VinFast Feliz Neo',30000000,'motorbike/VinFast Feliz Neo.jpg','trung_cap',0),(12,'VinFast Feliz S',30000000,'motorbike/VinFast Feliz S.jpg','trung_cap',1),(13,'VinFast Flazz',25000000,'motorbike/VinFast Flazz.jpg','pho_thong',0),(14,'VinFast Klara Neo',39000000,'motorbike/VinFast Klara Neo.jpg','trung_cap',0),(15,'VinFast Motio',25000000,'motorbike/VinFast Motio.jpg','pho_thong',0),(16,'Vinfast Theon S',69000000,'motorbike/Vinfast Theon S.jpg','cao_cap',1),(17,'VinFast Vento Neo',27000000,'motorbike/VinFast Vento Neo.jpg','cao_cap',0),(18,'Vinfast Vento S',27000000,'motorbike/Vinfast Vento S.jpg','cao_cap',0),(19,'VinFast Vero X',25000000,'motorbike/VinFast Vero X.jpg','cao_cap',1),(20,'Vinfast Viper',42000000,'motorbike/Vinfast Viper.jpg','cao_cap',0),(21,'VinFast Zgoo',25000000,'motorbike/VinFast Zgoo.jpg','pho_thong',1);
/*!40000 ALTER TABLE `motorbike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `route` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'VinFast O2O triển khai nền tảng mua xe máy điện trực tuyến','news/news1.jpg','news1','2026-04-12 12:48:28'),(2,'Vinfast ra mắt 4 mẫu xe máy điện mới, hoàn thiện lắp đặt 4500 trạm đổi pin đầu tiên','news/news2.jpg','news2','2026-04-12 12:48:28'),(3,'VinFast triển khai dịch vụ giao xe toàn quốc: Linh hoạt, thuận tiện, tối ưu trải nghiệm','news/news3.jpg','news3','2026-04-12 12:48:28');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,'VF1775466761643','3','VinFast Evo Grand Lite',22000000,'https://unsizeable-cedrick-envyingly.ngrok-free.dev/images/motorbike/VinFast%20Evo%20Grand%20Lite.png',1),(2,'VF1775568673286','car_4','Vinfast Limo Green',749000000,'https://unsizeable-cedrick-envyingly.ngrok-free.dev/images/car/Vinfast%20Limo%20Green.jpg',1),(3,'VF1775580831823','1','VinFast Evo 200 Lite',22000000,'motorbike/VinFast%20Evo%20200%20Lite.jpg',1),(9,'VF1776349049575','acc_1','Áo Polo Vinfast VF5 Thêu Hoa',350000,'https://unsizeable-cedrick-envyingly.ngrok-free.dev/images/accessory/Ao%20Polo%20Vinfast%20VF%205%20Th%C3%AAu%20Hoa.jpg',1),(10,'VF1776349049575','car_1','Vinfast EC Van',285000000,'https://unsizeable-cedrick-envyingly.ngrok-free.dev/images/car/Vinfast%20EC%20Van.jpg',1),(11,'VF1776349049575','1','VinFast Evo 200 Lite',22000000,'motorbike/VinFast%20Evo%20200%20Lite.jpg',1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `sub_total` bigint NOT NULL,
  `discount` bigint DEFAULT '0',
  `final_price` bigint NOT NULL,
  `status` varchar(50) DEFAULT 'Đang xử lý',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'VF1775466761643','user_test_123',22000000,100000,21900000,'Đang xử lý','2026-04-06 09:12:41'),(2,'VF1775568673286','user_test_123',749000000,0,749000000,'Đang xử lý','2026-04-07 13:31:13'),(3,'VF1775580831823','user_test_123',22000000,100000,21900000,'Đang xử lý','2026-04-07 16:53:51'),(7,'VF1776349049575','b',307350000,100000,307250000,'Đang xử lý','2026-04-16 14:17:29');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rating` decimal(2,1) DEFAULT '0.0',
  `address` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `route` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Vinfast An Khánh',4.8,'Địa chỉ đang cập nhật','/images/store/Vinfast An Khánh.jpg','store_1_detail'),(2,'VinFast Eco 247',4.8,'Địa chỉ đang cập nhật','/images/store/VinFast Eco 247.jpg','store_2_detail'),(3,'Vinfast Hoài Đức 3S',4.8,'Địa chỉ đang cập nhật','/images/store/Vinfast Hoài Đức 3S.jpg','store_3_detail'),(4,'VinFast Huy Hiệu',4.8,'Địa chỉ đang cập nhật','/images/store/VinFast Huy Hiệu.jpg','store_4_detail'),(5,'Vinfast Nguyễn Xiển',4.8,'Địa chỉ đang cập nhật','/images/store/Vinfast Nguyễn Xiển.jpg','store_5_detail'),(6,'VinFast Ngọc Hồi',4.8,'Địa chỉ đang cập nhật','/images/store/VinFast Ngọc Hồi.jpg','store_6_detail'),(7,'Vinfast Phạm Văn Đồng',4.8,'Địa chỉ đang cập nhật','/images/store/Vinfast Phạm Văn Đồng.jpg','store_7_detail'),(8,'VinFast Thịnh Phát',4.8,'Địa chỉ đang cập nhật','/images/store/VinFast Thịnh Phát.jpg','store_8_detail'),(9,'VinFast Tràng An',4.8,'Địa chỉ đang cập nhật','/images/store/VinFast Tràng An.jpg','store_9_detail'),(10,'Vinfast Việt Thanh',4.8,'Địa chỉ đang cập nhật','/images/store/Vinfast Việt Thanh.jpg','store_10_detail');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Daita','$2b$10$D.ARWOB/rUws3xwOZrWO6.v3QtpWJjde8wo7tmVWoUY8xktppwBYW','2026-02-21 09:43:06'),(6,'a','$2b$10$3xKP89GMmssyDsZOsDOPMuyieN9zxf5t7o9XzTbTpxHYMvsfDbIiu','2026-03-02 03:39:35'),(7,'test1','$2b$10$BZn12wa4VrwnsoKwJC0E2.pc4Y3h.afz6P5ryeex/GMEHofq7IkZy','2026-03-08 15:37:39'),(8,'b','$2b$10$zHtMGdRXSbazgBIDtSTAaOxSGvYJG4fNscXh0/YayXXLbDO0imz76','2026-03-08 15:42:11'),(9,'admin','$2b$10$Jybch4Ij0b7DhE9.eOOEaumyQRd55WGGhzY.4Z/SbqIzRNoYBSpBi','2026-04-12 01:46:47'),(10,'c','$2b$10$hafLf79DtUZ1nPIYgQr.l.0VcHS9t7IQ32ZBZRwuP7jSTAMTiRomq','2026-04-13 10:04:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `code` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,'Ưu đãi mừng năm mới','Giảm ngay 5.000.000đ khi mua xe VinFast dòng Evo. Áp dụng đến hết tháng 01/2025.','VFNEW2025','voucher/voucher1.jpg','2026-03-12 21:43:31'),(2,'Flash Sale cuối tuần','Tặng gói bảo dưỡng 1 năm trị giá 3.000.000đ cho khách hàng mua xe Feliz S.','VFFLASH25','voucher/voucher2.jpg','2026-03-12 21:43:31'),(3,'Ưu đãi khách hàng thân thiết','Hoàn tiền 10% tối đa 8.000.000đ dành riêng cho khách hàng đã mua xe VinFast từ trước.','VFLOYALTY','voucher/voucher3.jpg','2026-03-12 21:43:31'),(4,'Combo mua xe tặng phụ kiện','Tặng kèm bộ phụ kiện chính hãng trị giá 2.500.000đ khi mua bất kỳ mẫu xe nào.','VFCOMBO25','voucher/voucher4.jpg','2026-03-12 21:43:31');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-17 20:01:17
