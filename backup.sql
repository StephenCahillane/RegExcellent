-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (x86_64)
--
-- Host: localhost    Database: regexcellent
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` bigint NOT NULL,
  `description` text,
  `description2` text,
  `exclusion_words` text,
  `exclusion_words2` text,
  `hint` varchar(255) DEFAULT NULL,
  `match_words` text,
  `match_words2` text,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Trapped within the depths of a mysterious castle, you find yourself in a dimly lit dungeon. Before you stands a heavy, ornate door, inscribed with ancient symbols.  As you examine the door closely, you notice a small, dusty plate in front of it. It seems like some sort of mechanism awaits activation. To your left, you spot a dusty old pedestal with a small, weathered box resting upon it. It looks like it could fit perfectly onto the plate. The only clue you have is an inscription on the pedestal that reads: \\\"To move forward, you need a BOX\\\"','','[]','[]','Match \'BOX\' to move forward.','[\"BOX\"]','[]','Pressure Plate'),(2,'Ye shall need exactly {2} sturdy planks and {3} stout ropes to traverse yon treacherous moat infested with those fearsome crocodiles. Dost thou possess such provisions, noble traveler?','','[\"1\",\"4\",\"5\"]','[]','Only return the values of each, no need to specify ropes and planks','[\"2\",\"3\"]','[]','Croc'),(3,'Ahoy, valiant adventurer! To unlock yon mysterious door, thou must provideth a passcode in the format of three digits, a forward slash, and three more digits, like so: 575/99. What be the magical arrangement of numbers thou art to input, using the arcane art of regular expressions?','','[\"\"]','[]','\\\".\\\" Syntax is a \\\"wildcard\\\" in regular expressions, meaning it can be any digit.','[\"334/54\",\"445/12\",\"575/99\"]','[]','Locked Door'),(4,'Listen well, seeker of the mystic stew. Within the bubbling cauldron, combine the essence of \'cat,\' \'bat,\' and \'rat.\' Yet, heed this cryptic clue: extract only the shared elements, removing that which differ. What remains shall be the ingredients for thy potion.','','[\"cat\",\"bat\",\"rat\"]','[]','Match specific characters by defining them in square brackets. To exclude characters in the brackets, use \"^\".','[\"at\"]','[]','Riddle'),(5,'Thou art challenged to submerge thyself beneath the waves and retain thy breath for a span betwixt 0 to 6 seconds. To fulfill this aquatic feat, this enchanted incantation shall match time intervals betwixt 0 and 6 seconds, including fractional portions thereof','','[\"7\",\"8\",\"9\"]','[]','Use brackets with digits to indicate any amount of time between the values in brackets.','[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\"]','[]','River'),(6,'To proceed with this arcane ritual, thou must press and hold the button for a duration ranging from 1 to 5 seconds, excluding the elusive 1 and 5 seconds themselves. Tell me, what sequence of seconds shall thou summon, to perform this enigmatic act?','','[\"1\",\"5\"]','[]','Use the \\\"^\\\" syntax in brackets to indicate not the displayed values but those between.','[\"2\",\"3\",\"4\"]','[]','Button'),(7,'In this dire moment, as the room darkens with a swirling horde of bats, thou must wield the ancient magic of regular expressions. Chant the incantation \'BAT\' and invoke its power to conjure a mystical force that shall repel the winged intruders. Describe to me, how dost thou cast this regex spell to banish the bats from thy realm?','','[\"b\",\"ba\"]','[]','You must chant \"BAT\". You mustn\'t be too quiet!','[\"BAT\"]','[]','Bats'),(8,'As a troll draws near, its gravelly voice utters the incantation \'wazzzup.\' Beware, for this mystical phrase requires precision. To avoid the troll\'s wrath, thou must match its \'wazzzup\' exactly, with the precise count of Z\'s. Tell me, how many Z\'s shall thou use in your spell to ensure safe passage past this creature?','','[\"wazzup\",\"wazup\",\"wazzzzzup\"]','[]','Use curly braces \"{}\" to indicate number of Z\'s in expression.','[\"wazzzup\"]','[]','Troll'),(9,'Before thee lies a tablet, ancient and marred by time\'s touch. To unveil its secrets, thou must craft a cipher that harmoniously merges the essence of three distinct incantations. The verses are as follows: \'/match the combination ccccdee\' \'/match the combination ccdddde\' \'/match the combination ccee\' Compose a single cipher that captures the essence of these verses, and present it in the language of regular expressions, that the tablet\'s hidden knowledge may be brought to light.','','[\"cc\",\"dddddcc\",\"cccddecc\"]','[]','The \\\"*\\\" syntax is used to represent 0 or more of that value.','[\"ccccdee\",\"ccdddde\",\"ccee\"]','[]','Ruined Tablet'),(10,'Within this dungeon\'s ancient keep, A riddle\'s secret lies buried deep. One verse to solve, the path revealed, For freedom\'s embrace to be unsealed. Harken to my enigmatic decree, Seek what\'s hidden, the answer shall be. When mind and wit align with grace, The riddle\'s hold shall then efface. Now, noble seeker, heed this plea, Share with me the words set free. To exit this realm, embrace the light, Reveal the beginning and end, take flight.','','[\"With\",\"Fli\"]','[]','Return the first and last word of each paragraph to escape!','[\"Withinflight\"]','[]','Final Door');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_seq`
--

DROP TABLE IF EXISTS `question_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_seq`
--

LOCK TABLES `question_seq` WRITE;
/*!40000 ALTER TABLE `question_seq` DISABLE KEYS */;
INSERT INTO `question_seq` VALUES (201);
/*!40000 ALTER TABLE `question_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-30 10:39:50
