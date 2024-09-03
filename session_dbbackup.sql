-- MySQL dump 10.13  Distrib 8.3.0, for macos14 (arm64)
--
-- Host: localhost    Database: session_db
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(255) NOT NULL,
  `expires` int NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('_ZanUpB5t0u-jtwZOyaSCbf0sCfz7Alp',1723797690,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('07gCgBUZvl-U7sD8kXqkXMIeiI3Qtsds',1723797827,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('1hCctFd2UtIHfQeG2C6PpeQfTS-TwfsP',1723792148,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('1JKmSGtX_2ir7FxUFIztqMW5MH2BT42v',1723816724,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('3OwymD5iJyjDoGgIvJUhFnpj1tTC4gUQ',1723818716,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('3pjpSiyjzrEyxUJXnJ9wbHRTqg_sns4s',1723796287,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('3ra5oHi8mZvG9L72Lj5P7nbMY0ncfsjG',1723816386,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('48zTJHwyON5-cA7avogaHT3gud_P1kfE',1723793347,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('9oynb0HrXVlp-uE3QUT1RMX9p_at9MGI',1723793155,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('AorDWCiZcam6Vxx8spi8uY3gxw4fnDdW',1723793157,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('Ap7bu_L7wPGv8vWiX_U6OqpuRnqq7E3d',1723816382,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('bPn9fcXyMiz4rynHRbk3g2jvn1WQOJPt',1723790621,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"gobdan74\"}'),('BsqDnxfjrlFEeu5JtlOxZ26yPSaHNyrP',1723818712,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('Cv_sWbt01TyLQGMe3Y_g2ZiVv4aw61zp',1723789705,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('dwCbNxWeFbbIK-gFRaXhJr4SQtT3u-vi',1723816801,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('fHftXtRASf_-gcSdYBM5bpwbs6gPQ1NN',1723738161,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('fMm0Kz54OKDHdzdDmUihD_5vknRCfDdN',1723818933,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('fuFWFdtOwQAfu07rzODo0yPVpeUu5jEk',1723787155,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('fZO0mtfHopGA9Ej3IIoCoeJAOIOZH5aD',1723811909,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('GfUfOqx3rZMoJG3gTwy0PaOIqJ9zDwjy',1723795316,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('Gize3ueY5YvF8blJorNZp-rnR3c1Va3Q',1723830657,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"gobdan74\"}'),('Gz6P-a40dE3HIeSieSpSn4-DlpobHqn6',1723786266,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('HnwHQEFgkgGgML0c1xrrwzXcjoh0lAXO',1723795157,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('IBcykKXw15_jpZxcYPN412A10s-pr-TN',1723775544,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"gobdan74\"}'),('jn-nRWTy78KLPCBYTXTqw579WkD_YhVk',1723811379,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('Jrv2wUhDSlVlJrL15XVhz_uLn7UU0yg1',1723825537,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('KyfpmOzI8yUlSMXKGVtXqwRQ5s94Acck',1723818929,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('lN4KxtmFuP_fLQ7xLUAJqqFxLm3fs3lL',1723828011,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('LVSNVDfxOntC9ZhcVuIGs771irYmnLkx',1723786229,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('lz-pz3sLlCXxzBbD7531eYzrF4pvtsmL',1723738028,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('rmBpfqGF5Z4UWr1slYYcC7P6mexWgyH7',1723797132,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('S-4fAYA8vUipWe1F56T4yzcpk1nTyp7i',1723775730,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('tlDNoRODxdQ9q7YZpD4Q1KxdGLtIlJZN',1723836021,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('trAtfFGXZy-cyPCbP6pko0hE-K2mkI69',1723830193,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"gobdan74\"}'),('urXMI1t78f6LV4erO-MX4Nk1DKAhk2Na',1723792552,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('w74uxvOVMBaLXWcfhPqIaHWZlAP7C3BL',1723792550,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"jaycho0617\"}'),('YfMqu9PibxpQ-gR4swyGGvh4V-xSXiJV',1723828767,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"gobdan74\"}'),('yTwgy0aHh7ry6F3ujTCo0pipcHMm6dvt',1723811298,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('yyjRHtXtij6iUL3fL9ZQ5mf-DzeH-W6Q',1723811352,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('zApAbat3PzEVnmatMvPMhEW1vGj6pEk1',1723788856,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}'),('ZvMtNcOuzF9gT6P14S1QHAC6WB-XbChD',1723811922,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"test\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-03 13:31:20
