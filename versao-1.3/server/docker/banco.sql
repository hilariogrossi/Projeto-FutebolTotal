-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: futebol_total
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `jogadores`
--

DROP TABLE IF EXISTS `jogadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogadores` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_time` bigint unsigned NOT NULL,
  `id_api` bigint unsigned DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `idade` tinyint NOT NULL,
  `numero_camisa` tinyint NOT NULL,
  `posicao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jogadores_FK` (`id_time`),
  CONSTRAINT `jogadores_FK` FOREIGN KEY (`id_time`) REFERENCES `times` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogadores`
--

LOCK TABLES `jogadores` WRITE;
/*!40000 ALTER TABLE `jogadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `jogadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rank_brasileirao`
--

DROP TABLE IF EXISTS `rank_brasileirao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rank_brasileirao` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_time` bigint unsigned NOT NULL,
  `rank` tinyint NOT NULL,
  `jogos` tinyint NOT NULL,
  `vitorias` tinyint NOT NULL,
  `empates` tinyint NOT NULL,
  `derrotas` tinyint NOT NULL,
  `gols_marcados` tinyint NOT NULL,
  `gols_sofridos` tinyint NOT NULL,
  `saldo_de_gols` tinyint NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  `update` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rank_brasileirao_FK` (`id_time`),
  CONSTRAINT `rank_brasileirao_FK` FOREIGN KEY (`id_time`) REFERENCES `times` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank_brasileirao`
--

LOCK TABLES `rank_brasileirao` WRITE;
/*!40000 ALTER TABLE `rank_brasileirao` DISABLE KEYS */;
/*!40000 ALTER TABLE `rank_brasileirao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `times`
--

DROP TABLE IF EXISTS `times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `times` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `id_api` bigint unsigned NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `nome_estadio` varchar(255) DEFAULT NULL,
  `endereco_estadio` varchar(255) DEFAULT NULL,
  `cidade_estadio` varchar(255) DEFAULT NULL,
  `ano_fundacao` smallint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `times`
--

LOCK TABLES `times` WRITE;
/*!40000 ALTER TABLE `times` DISABLE KEYS */;
INSERT INTO `times` VALUES (3,'Vasco DA Gama',133,'VAS','Estádio São Januário','Rua Gal Almério de Moura 131, Bairro Vasco da Gama','Rio de Janeiro, Rio de Janeiro',1898),(4,'Palmeiras',121,'PAL','Allianz Parque','Rua Turiaçu 1840, Perdizes','São Paulo, São Paulo',1914),(5,'Atletico-MG',1062,'ATL','Estádio Raimundo Sampaio','Avenida Ismênia Tunes, Bairro Horto','Belo Horizonte, Minas Gerais',1908),(6,'Botafogo',120,'BOT','Estádio Nilton Santos','Rua Arquias Cordeiro, Engenho de Dentro','Rio de Janeiro',1904),(7,'RB Bragantino',794,'BRA','Estádio Nabi Abi Chedid','Rua Emílio Coleta','Bragança Paulista, São Paulo',1928),(8,'Sao Paulo',126,'PAU','Estádio Cícero Pompeu de Toledo (Morumbi)','Praca Roberto Gomes Pedrosa 1, Morumbi','São Paulo, São Paulo',1930),(9,'Fluminense',124,'FLU','Estadio Jornalista Mário Filho (Maracanã)','Rua Professor Eurico Rabelo, Maracanã','Rio de Janeiro, Rio de Janeiro',1902),(10,'Santos',128,'SAN','Estádio Urbano Caldeira','Rue Princesa Isabel 77, Vila Belmiro','Santos, São Paulo',1912),(11,'Internacional',119,'INT','Estádio José Pinheiro Borda','Avenida Padre Cacique 891, Bairro Menino Deus','Porto Alegre, Rio Grande do Sul',1909),(12,'Flamengo',127,'FLA','Estadio Jornalista Mário Filho (Maracanã)','Rua Professor Eurico Rabelo, Maracanã','Rio de Janeiro, Rio de Janeiro',1895),(13,'Fortaleza EC',154,'FOR','Estádio Governador Plácido Aderaldo Castelo','Avenida Alberto Craveiro, Passaré','Fortaleza, Ceará',1918),(14,'Gremio',130,'GRE','Arena do Grêmio','Bairro Humaitá','Porto Alegre, Rio Grande do Sul',1903),(15,'Cuiaba',1193,'CUI','Arena Pantanal',NULL,'Cuiabá, Mato Grosso',2001),(16,'Atletico Paranaense',134,'ATL','Arena da Baixada','Rua Buenos Aires 1260, Água Verde','Curitiba, Paraná',1924),(17,'Cruzeiro',135,'CRU','Estádio Governador Magalhães Pinto','Avenida Antonio Abrahão Carã 1001, Pampulhas','Belo Horizonte, Minas Gerais',1921),(18,'Corinthians',131,'COR','Neo Química Arena','Avenida Miguel Inácio Curi, 111, Vila Carmosina, Itaquera','São Paulo, São Paulo',1910),(19,'Goias',151,'GOI','Estádio de Hailé Pinheiro','Avenida Edmundo Pinheiro de Abreu 721, Setor Bela Vista','Goiânia, Goiás',1943),(20,'Coritiba',147,'COR','Estádio Major Antônio Couto Pereira','Rua Ubaldino do Amaral 37, Bairro Alto da Glória','Curitiba, Paraná',1909),(21,'Bahia',118,'BAH','Arena Fonte Nova','Rua Lions Club, Nazaré','Salvador, Bahia',1931),(22,'America Mineiro',125,'AME','Estádio Raimundo Sampaio','Avenida Ismênia Tunes, Bairro Horto','Belo Horizonte, Minas Gerais',1912);
/*!40000 ALTER TABLE `times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `times_estatisticas`
--

DROP TABLE IF EXISTS `times_estatisticas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `times_estatisticas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_time` bigint unsigned NOT NULL,
  `jogos_casa` tinyint NOT NULL,
  `jogos_fora` tinyint NOT NULL,
  `jogos_totais` tinyint NOT NULL,
  `vitorias_casa` tinyint NOT NULL,
  `vitorias_fora` tinyint NOT NULL,
  `empates_casa` tinyint NOT NULL,
  `empates_fora` tinyint NOT NULL,
  `vitorias_totais` tinyint NOT NULL,
  `empates_totais` tinyint NOT NULL,
  `derrotas_casa` tinyint NOT NULL,
  `derrotas_fora` tinyint NOT NULL,
  `derrotas_totais` tinyint NOT NULL,
  `gols_totais` tinyint NOT NULL,
  `gols_casa` tinyint NOT NULL,
  `gols_fora` tinyint NOT NULL,
  `gols_contra` tinyint NOT NULL,
  `nao_sofreu_gol_casa` tinyint NOT NULL,
  `nao_sofreu_gol_fora` tinyint NOT NULL,
  `nao_marcou_gol_casa` tinyint NOT NULL,
  `nao_marcou_gol_fora` tinyint NOT NULL,
  `penaltis_convertidos` tinytext NOT NULL,
  `penaltis_perdidos` tinyint DEFAULT NULL,
  `penaltis_totais` tinyint NOT NULL,
  `cartoes_amarelos` tinyint unsigned NOT NULL,
  `cartoes_vermelhos` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `times_estatisticas_FK` (`id_time`),
  CONSTRAINT `times_estatisticas_FK` FOREIGN KEY (`id_time`) REFERENCES `times` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `times_estatisticas`
--

LOCK TABLES `times_estatisticas` WRITE;
/*!40000 ALTER TABLE `times_estatisticas` DISABLE KEYS */;
/*!40000 ALTER TABLE `times_estatisticas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13  1:41:48
