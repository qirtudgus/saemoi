-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: saemoi_schema
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `index` int NOT NULL AUTO_INCREMENT,
  `id` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `nickname` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_bin NOT NULL,
  `date` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `latestEditDate` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `commentCount` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `view` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `likes` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `likeUserList` varchar(1000) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (27,'qirtudgus','박성현입니데','게시판 테스트입니다.','<p>게시판 테스트입니다.</p><p>ㅎ</p><p>ㅎ</p><p>ㅎ</p><p>ㅎ</p>','2022.11.23 21:19','','1','4','1','qirtudgus,'),(28,'qirtudgus','박성현입니데','2222222222','<p>2222222222222222</p>','2022.11.23 22:19','','0','0','0',''),(29,'qirtudgus','박성현입니데','333333333333333333333','<p>3333333333333333333</p>','2022.11.23 22:19','','0','0','0',''),(30,'qirtudgus','박성현입니데','44444444444','<p>4444444444444444444444</p>','2022.11.23 22:19','','0','1','0',''),(31,'qirtudgus','박성현입니데','5555555555555','<p>55555555555555555555</p>','2022.11.23 22:19','','0','0','0',''),(32,'qirtudgus','박성현입니데','66','<p>6666</p>','2022.11.23 22:19','','0','0','0',''),(33,'qirtudgus','박성현입니데','7','<p>77777777</p>','2022.11.23 22:19','','0','0','0',''),(34,'qirtudgus','박성현입니데','8888888','<p>888888888888</p>','2022.11.23 22:19','','0','0','0',''),(35,'qirtudgus','박성현입니데','999999999','<p>999999999999999</p>','2022.11.23 22:19','','0','2','0',''),(36,'qirtudgus','박성현입니데','10','<p><br></p>','2022.11.23 22:19','','0','2','0',''),(37,'qirtudgus','박성현입니데','11','<p>111111111111111</p>','2022.11.23 22:19','','1','3','0','');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commenttable`
--

DROP TABLE IF EXISTS `commenttable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commenttable` (
  `index` int NOT NULL AUTO_INCREMENT,
  `board_index` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nickname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orders` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `depth` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `comment_index` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `isDeleted` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'false',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commenttable`
--

LOCK TABLES `commenttable` WRITE;
/*!40000 ALTER TABLE `commenttable` DISABLE KEYS */;
INSERT INTO `commenttable` VALUES (109,'27','qirtudgus','박성현입니데','수정 삭제 버튼이 구려요','2022.11.23 21:19','0','0','109','false'),(110,'27','qirtudgus','박성현입니데','답글입니다...','2022.11.23 21:49','1','1','109','false'),(111,'37','12','qwer','오...','2022.11.25 23:12','0','0','111','false'),(112,'37','12','qwer','오오오','2022.11.25 23:12','1','1','111','false'),(113,'37','1234','qwer1','gg','2022.11.25 23:17','0','0','113','false'),(114,'37','1234','qwer1','ggg\n','2022.11.25 23:17','1','1','113','true'),(115,'37','1234','qwer1','gggg','2022.11.25 23:17','2','1','111','false');
/*!40000 ALTER TABLE `commenttable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raidboard`
--

DROP TABLE IF EXISTS `raidboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raidboard` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `raidCode` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `monsterName` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `raidPosition` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `raidDifficulty` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `raidOption` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `raidText` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `date` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='레이드 게시판';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raidboard`
--

LOCK TABLES `raidboard` WRITE;
/*!40000 ALTER TABLE `raidboard` DISABLE KEYS */;
INSERT INTO `raidboard` VALUES (1,'','qwe','qe','wewqe','어태커','5','세턴에 공격','레이드 테스트용 텍스트',''),(2,'','qwe','qe','wewqe','어태커','5','첫턴 도발 / 세턴에 공격 / 디버프 금지','레이드 테스트용 텍스트',''),(3,'','A87SDX','리자몽','페어리','올라운더','6','1턴 도발 / 3턴 공격 / 디버프 금지','열심히 합시다.','2022.12.03 16:10'),(4,'','ㅁㄴㅇㅇㄴㅁ','올로롤리','불','어태커','6','디버프 금지 / 특수방어? / 방어?','ㅋㅋ','2022.12.03 16:20'),(5,'','ㅁㄴㅇㄹ','ㅁㅇㄴ','ㅇㅁㄴ','어태커','6','1딜러 3서폿','ㅇㅁㄴ','2022.12.03 16:25'),(6,'','ㅋㅋ','ㅋㅋㅋ','ㅋㅋㅋ','어태커','6','1턴 도발 / 3턴 공격 / 디버프 금지 / 나이킹팟 / 1딜러 3서폿 / 특수방어? / 방어?','ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','2022.12.03 16:31'),(7,'','ㅁㅇㄴㅇㅁㄴ','ㅁㄴㅇㅇ','ㅇㅁㄴ','어태커','6','','','2022.12.03 16:33'),(8,'qwer','eq2eq','dad','페어리','어태커','6','디버프 금지 / 1딜러 3서폿 / 특수방어?','적당히','2022.12.03 16:39'),(9,'qwer','123','qwe','qwqw','어태커','6','1턴 도발 / 3턴 공격 / 디버프 금지 / 나이킹팟 / 1딜러 3서폿 / 특수방어? / 방어?','zzzzzzzzzzz','2022.12.03 16:58'),(10,'qwer','qwe','qwe','qewe','어태커','6','디버프 금지 / 나이킹팟','qwe','2022.12.03 16:59'),(11,'qwer','QWA221','qwe','asd','어태커','6성','1딜러 3서폿','gg','2022.12.03 20:40'),(12,'qwer','A43EAW','qeas','awfa','어태커','7성','#1턴 도발 #3턴 공격 #디버프 금지 #나이킹팟 #1딜러 3서폿 #특수방어? #방어? ','','2022.12.03 20:54'),(13,'qwer','RQW21Q','fsea','fsea','어태커','6성','','하하','2022.12.03 21:50'),(14,'qwer','ㄷ23ㅂㄷㅈ','리자몽','불','어태커','6성','#디버프 금지 #특수방어? ','','2022.12.03 21:56'),(15,'qwer','ㅁㄴㅇㅇ23','ㅂㅈㄷㅂ','ㅇㅁㄴㄻ','올라운더','6성','나이킹팟 / 1딜러 3서폿','','2022.12.03 21:57'),(16,'','QRE23R','망나뇽','불','어태커','6성','특수방어?, 방어?','적당히하셈','2022.12.03 23:56'),(17,'','ㄷ2ㅂㅂㄷㄹ','ㄷㅂㅈ','ㄷ231','어태커','6성','1턴 도발, 3턴 공격, 디버프 금지, 나이킹팟, 1딜러 3서폿','','2022.12.04 00:00');
/*!40000 ALTER TABLE `raidboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `index` int NOT NULL AUTO_INCREMENT,
  `id` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `nickname` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `salt` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `refreshToken` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
  `profile` varchar(1000) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'12','qwer','ec71aaec6047d9d8e29db2a869b8a0c7194921b9a248a506eed649b7d2740aab','6f3af1a1001e2d3c3bf345184a7f4b90','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAwNzUyMDYsImV4cCI6MTY3MTM3MTIwNn0.VmYvg8ddh-D0OzKO7GpStrYQQKP6OaPDd_w4SDpw-pc',NULL),(2,'123','qwerq','7710ef6e0e9e6cd596272adf797cbfb1d8dc1d1963b8b515f6503578c15b3545','95ade9654e319c9ce6e1cab5db3f5e46','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAwNjIxNzQsImV4cCI6MTY3MTM1ODE3NH0.5hGI0nseqnKpjQo8KWDTBKw81Pr3K4I0DKQ8POtOyyE',NULL),(3,'qwer','박성현입니다','b4e5f8353a00d53334e9f179aba7cf719251222ea1dd224233155e3294a7c9a8','d2c1f9a7e437b1adbfea2ee6f60a4c6d','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgzODUxMTksImV4cCI6MTY2OTY4MTExOX0.kQ-Rvzd1jw8Y4J9qErCg3DkAUNDLppWdVmMCq2O2sP0',NULL),(4,'qirtudgus','박성현입니데','f706dc931f904894337887489bb690f94556fe141d923b939e302dd199bee4ee','db7c7287c0e4d681fd9567aa7dd3dcc7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjkyMDU5NDksImV4cCI6MTY3MDUwMTk0OX0.c3qr30A276i-zLxwO7kMfaTnnHJy2zbBPP2vXgpLAYY',NULL),(5,'1234','qwer1','4d7ca3b1224f4b2c914c8fe6ba03a210d98a62ece7f20d6a4e2eb5551ec9a300','ea78721128e6ed622969a9a7ac6cf0e7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjkzODU4NDQsImV4cCI6MTY3MDY4MTg0NH0.G3g5YTkA7txT-oOcVHMD2tXeIVLIFdswZvJHMZ7diys',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-04  1:25:47
