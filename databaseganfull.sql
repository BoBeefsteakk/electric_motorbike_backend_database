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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consults`
--

LOCK TABLES `consults` WRITE;
/*!40000 ALTER TABLE `consults` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motorbike`
--

LOCK TABLES `motorbike` WRITE;
/*!40000 ALTER TABLE `motorbike` DISABLE KEYS */;
INSERT INTO `motorbike` VALUES (1,'VinFast Evo 200 Lite',22000000,'motorbike/VinFast Evo 200 Lite.jpg','pho_thong'),(2,'VinFast Evo 200',22000000,'motorbike/VinFast Evo 200.jpg','pho_thong'),(3,'VinFast Evo Grand Lite',22000000,'motorbike/VinFast Evo Grand Lite.png','pho_thong'),(4,'VinFast Evo Grand',22000000,'motorbike/VinFast Evo Grand.jpg','pho_thong'),(5,'Vinfast Evo Lite Neo',22000000,'motorbike/Vinfast Evo Lite Neo.jpg','pho_thong'),(6,'VinFast Evo Neo',22000000,'motorbike/VinFast Evo Neo.jpg','pho_thong'),(7,'VinFast Evo',22000000,'motorbike/VinFast Evo.jpg','pho_thong'),(8,'VinFast Feliz 2025',30000000,'motorbike/VinFast Feliz 2025.jpg','trung_cap'),(9,'VinFast Feliz II',30000000,'motorbike/VinFast Feliz II.png','trung_cap'),(10,'VinFast Feliz Lite',30000000,'motorbike/VinFast Feliz Lite.png','trung_cap'),(11,'VinFast Feliz Neo',30000000,'motorbike/VinFast Feliz Neo.jpg','trung_cap'),(12,'VinFast Feliz S',30000000,'motorbike/VinFast Feliz S.jpg','trung_cap'),(13,'VinFast Flazz',25000000,'motorbike/VinFast Flazz.jpg','pho_thong'),(14,'VinFast Klara Neo',39000000,'motorbike/VinFast Klara Neo.jpg','trung_cap'),(15,'VinFast Motio',25000000,'motorbike/VinFast Motio.jpg','pho_thong'),(16,'Vinfast Theon S',69000000,'motorbike/Vinfast Theon S.jpg','cao_cap'),(17,'VinFast Vento Neo',27000000,'motorbike/VinFast Vento Neo.jpg','cao_cap'),(18,'Vinfast Vento S',27000000,'motorbike/Vinfast Vento S.jpg','cao_cap'),(19,'VinFast Vero X',25000000,'motorbike/VinFast Vero X.jpg','cao_cap'),(20,'Vinfast Viper',42000000,'motorbike/Vinfast Viper.jpg','cao_cap'),(21,'VinFast Zgoo',25000000,'motorbike/VinFast Zgoo.jpg','pho_thong');
/*!40000 ALTER TABLE `motorbike` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Daita','$2b$10$D.ARWOB/rUws3xwOZrWO6.v3QtpWJjde8wo7tmVWoUY8xktppwBYW','2026-02-21 09:43:06'),(6,'a','$2b$10$3xKP89GMmssyDsZOsDOPMuyieN9zxf5t7o9XzTbTpxHYMvsfDbIiu','2026-03-02 03:39:35'),(7,'test1','$2b$10$BZn12wa4VrwnsoKwJC0E2.pc4Y3h.afz6P5ryeex/GMEHofq7IkZy','2026-03-08 15:37:39'),(8,'b','$2b$10$zHtMGdRXSbazgBIDtSTAaOxSGvYJG4fNscXh0/YayXXLbDO0imz76','2026-03-08 15:42:11');
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

-- Dump completed on 2026-03-13  6:11:27
