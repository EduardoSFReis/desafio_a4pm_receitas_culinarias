-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: teste_receitas_rg_sistemas
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (13,'Alimentação Saudável'),(3,'Aves'),(8,'Bebidas'),(1,'Bolos e tortas doces'),(2,'Carnes'),(9,'Doces e sobremesas'),(10,'Lanches'),(12,'Light'),(7,'Massas'),(4,'Peixes e frutos do mar'),(11,'Prato Único'),(5,'Saladase e molhos');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receitas`
--

DROP TABLE IF EXISTS `receitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receitas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuarios` int unsigned NOT NULL,
  `id_categorias` int unsigned DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `tempo_preparo_minutos` int unsigned DEFAULT NULL,
  `porcoes` int unsigned DEFAULT NULL,
  `modo_preparo` text NOT NULL,
  `ingredientes` text,
  `criado_em` datetime NOT NULL,
  `alterado_em` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_receitas_1_idx` (`id_usuarios`),
  KEY `fk_receitas_2_idx` (`id_categorias`),
  CONSTRAINT `fk_receitas_1` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_receitas_2` FOREIGN KEY (`id_categorias`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receitas`
--

LOCK TABLES `receitas` WRITE;
/*!40000 ALTER TABLE `receitas` DISABLE KEYS */;
INSERT INTO `receitas` VALUES (53,4,1,'Bolo de Chocolate Fofinho',40,8,'1. No liquidificador, bata os ovos, o açúcar, o óleo e o achocolatado.\n2. Em uma tigela, despeje a mistura e adicione a farinha de trigo e o fermento, misturando bem.\n3. Despeje em uma forma untada e enfarinhada.\n4. Asse em forno preaquecido a 180°C por aproximadamente 30 minutos.','- 3 ovos\n- 1 e 1/2 xícara (chá) de açúcar\n- 1/2 xícara (chá) de óleo\n- 1 xícara (chá) de achocolatado em pó\n- 2 xícaras (chá) de farinha de trigo\n- 1 xícara (chá) de água quente\n- 1 colher (sopa) de fermento em pó','2025-08-19 18:46:23','2025-08-19 18:46:23'),(54,1,1,'Torta de Limão Cremosa',30,10,'1. Triture o biscoito maisena e misture com a manteiga derretida até formar uma farofa úmida.\n2. Forre o fundo e as laterais de uma forma de aro removível e asse por 10 minutos em forno a 180°C.\n3. No liquidificador, bata o leite condensado, o creme de leite e o suco de limão.\n4. Despeje o creme sobre a massa fria e leve à geladeira por pelo menos 3 horas.\n5. Decore com raspas de limão.','- 1 pacote de biscoito maisena\n- 100g de manteiga sem sal derretida\n- 1 lata de leite condensado\n- 1 caixinha de creme de leite\n- 1/2 xícara de suco de limão\n- Raspas de limão para decorar','2025-08-19 18:46:23','2025-08-19 18:46:23'),(55,1,2,'Picanha ao Forno com Sal Grosso',60,6,'1. Tempere a peça de picanha com sal grosso por todos os lados.\n2. Coloque a picanha em uma assadeira com a gordura virada para cima.\n3. Leve ao forno preaquecido a 200°C por cerca de 50 minutos para um ponto mal passado.\n4. Fatie e sirva imediatamente.','- 1 peça de picanha (aproximadamente 1,2kg)\n- Sal grosso a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(56,4,2,'Costela na Panela de Pressão',90,8,'1. Tempere a costela com alho, sal e pimenta.\n2. Na panela de pressão, doure a cebola no óleo.\n3. Adicione a costela e sele de todos os lados.\n4. Cubra com água, tampe a panela e cozinhe por cerca de 45 minutos após pegar pressão.\n5. Retire a pressão, adicione a mandioca e cozinhe por mais 15 minutos ou até a mandioca ficar macia.','- 1,5kg de costela bovina\n- 2 cebolas grandes em rodelas\n- 4 dentes de alho amassados\n- Sal e pimenta do reino a gosto\n- 500g de mandioca em pedaços\n- Cheiro-verde picado a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(57,4,3,'Frango Assado com Batatas',70,6,'1. Tempere o frango com sal, pimenta, alho e ervas.\n2. Em uma assadeira, disponha as batatas e o frango.\n3. Regue com azeite e leve ao forno preaquecido a 200°C por aproximadamente 1 hora, virando na metade do tempo.','- 1kg de coxas e sobrecoxas de frango\n- 500g de batatas em rodelas\n- 3 dentes de alho picados\n- Ervas finas a gosto (alecrim, tomilho)\n- Sal e pimenta do reino a gosto\n- Azeite de oliva','2025-08-19 18:46:23','2025-08-19 18:46:23'),(58,1,3,'Strogonoff de Frango Simples',30,4,'1. Em uma panela, doure o frango picado no azeite.\n2. Adicione a cebola e o alho e refogue.\n3. Acrescente o molho de tomate, o ketchup e a mostarda. Cozinhe por alguns minutos.\n4. Desligue o fogo e incorpore o creme de leite.\n5. Sirva com arroz branco e batata palha.','- 500g de peito de frango em cubos\n- 1 cebola picada\n- 2 dentes de alho picados\n- 1/2 xícara de molho de tomate\n- 2 colheres (sopa) de ketchup\n- 1 colher (sopa) de mostarda\n- 1 lata de creme de leite','2025-08-19 18:46:23','2025-08-19 18:46:23'),(59,1,4,'Salmão ao Forno com Alcaparras',25,2,'1. Tempere os filés de salmão com sal e pimenta.\n2. Em uma assadeira, regue com azeite, adicione as alcaparras e o suco de limão.\n3. Coloque os filés de salmão e leve ao forno preaquecido a 180°C por cerca de 15-20 minutos.','- 2 filés de salmão\n- 2 colheres (sopa) de alcaparras\n- Suco de 1 limão\n- Sal e pimenta do reino a gosto\n- Azeite de oliva','2025-08-19 18:46:23','2025-08-19 18:46:23'),(60,4,4,'Moqueca de Camarão',40,4,'1. Tempere os camarões com limão, sal e pimenta.\n2. Em uma panela de barro, refogue a cebola e os pimentões no azeite de dendê.\n3. Adicione os tomates e cozinhe até desmancharem.\n4. Acrescente os camarões e o leite de coco, cozinhando por cerca de 5 minutos.\n5. Finalize com coentro picado.','- 500g de camarão limpo\n- 1 cebola em rodelas\n- 1 pimentão vermelho em rodelas\n- 1 pimentão amarelo em rodelas\n- 2 tomates em rodelas\n- 200ml de leite de coco\n- 2 colheres (sopa) de azeite de dendê\n- Suco de 1 limão\n- Coentro picado a gosto\n- Sal e pimenta a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(61,4,5,'Salada Caesar com Frango',25,2,'1. Grelhe o filé de frango e corte em tiras.\n2. Em uma saladeira, misture a alface, os croutons e o queijo parmesão.\n3. Para o molho, bata no liquidificador a maionese, o alho, as anchovas, o suco de limão e a mostarda.\n4. Adicione o frango à salada e regue com o molho.','- 1 pé de alface romana\n- 1 filé de frango grelhado\n- 1 xícara de croutons\n- 1/2 xícara de queijo parmesão ralado\n- Para o molho: 1/2 xícara de maionese, 1 dente de alho, 2 filés de anchova, suco de 1/2 limão, 1 colher (chá) de mostarda Dijon','2025-08-19 18:46:23','2025-08-19 18:46:23'),(62,1,5,'Molho de Iogurte para Salada',5,4,'1. Em uma tigela, misture o iogurte natural, o suco de limão e o azeite.\n2. Adicione a hortelã picada, o sal e a pimenta.\n3. Misture bem e sirva sobre sua salada preferida.','- 1 pote de iogurte natural\n- Suco de 1/2 limão\n- 2 colheres (sopa) de azeite\n- Folhas de hortelã picadas a gosto\n- Sal e pimenta do reino a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(63,1,7,'Lasanha à Bolonhesa',90,8,'1. Prepare o molho bolonhesa refogando a carne moída com cebola, alho e tomate.\n2. Cozinhe a massa da lasanha conforme as instruções da embalagem.\n3. Monte a lasanha em um refratário, alternando camadas de molho, massa e queijo.\n4. Finalize com queijo parmesão e leve ao forno para gratinar.','- 500g de massa de lasanha\n- 500g de carne moída\n- 1 cebola picada\n- 2 dentes de alho picados\n- 1 lata de tomate pelado\n- 300g de queijo mussarela fatiado\n- Queijo parmesão ralado a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(64,4,7,'Macarrão ao Pesto',20,4,'1. Cozinhe o macarrão conforme as instruções da embalagem.\n2. Para o molho pesto, bata no processador o manjericão, o alho, as nozes, o queijo parmesão e o azeite.\n3. Escorra o macarrão e misture com o molho pesto.\n4. Sirva imediatamente.','- 400g de macarrão (espaguete ou penne)\n- 2 xícaras de folhas de manjericão fresco\n- 2 dentes de alho\n- 1/2 xícara de nozes\n- 1/2 xícara de queijo parmesão ralado\n- 1/2 xícara de azeite de oliva\n- Sal a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(65,4,8,'Caipirinha Tradicional',5,1,'1. Em um copo, macere o limão com o açúcar.\n2. Adicione a cachaça e o gelo.\n3. Mexa bem e sirva.','- 1 limão\n- 2 colheres (chá) de açúcar\n- 50ml de cachaça\n- Gelo a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(66,1,8,'Suco Detox Verde',10,2,'1. Bata todos os ingredientes no liquidificador.\n2. Coe se preferir e sirva em seguida.','- 2 folhas de couve\n- 1 maçã\n- 1 pedaço pequeno de gengibre\n- Suco de 1 limão\n- 200ml de água de coco','2025-08-19 18:46:23','2025-08-19 18:46:23'),(67,1,9,'Brigadeirão de Liquidificador',45,8,'1. Bata todos os ingredientes no liquidificador.\n2. Despeje em uma forma de pudim untada com manteiga e polvilhada com açúcar.\n3. Asse em banho-maria em forno preaquecido a 180°C por cerca de 30 minutos.\n4. Deixe esfriar para desenformar e decore com chocolate granulado.','- 1 lata de leite condensado\n- 1 lata de creme de leite\n- 1 xícara de chocolate em pó\n- 3 ovos\n- 1 colher (sopa) de manteiga\n- Chocolate granulado para decorar','2025-08-19 18:46:23','2025-08-19 18:46:23'),(68,4,9,'Mousse de Maracujá Fácil',15,6,'1. Bata no liquidificador o leite condensado, o creme de leite e o suco de maracujá concentrado.\n2. Despeje em taças individuais ou em um refratário.\n3. Leve à geladeira por pelo menos 2 horas.\n4. Decore com a polpa da fruta.','- 1 lata de leite condensado\n- 1 lata de creme de leite\n- A mesma medida da lata de suco de maracujá concentrado\n- Polpa de 1 maracujá para decorar','2025-08-19 18:46:23','2025-08-19 18:46:23'),(69,4,10,'Sanduíche de Frango Desfiado',20,4,'1. Cozinhe e desfie o peito de frango.\n2. Em uma tigela, misture o frango desfiado com a maionese, a cenoura ralada e o cheiro-verde.\n3. Tempere com sal e pimenta.\n4. Recheie os pães de forma e sirva.','- 2 xícaras de frango cozido e desfiado\n- 1/2 xícara de maionese\n- 1/2 cenoura ralada\n- Cheiro-verde picado a gosto\n- 8 fatias de pão de forma\n- Sal e pimenta do reino a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(70,1,10,'Pão de Queijo Caseiro',40,15,'1. Ferva o leite, a água e o óleo.\n2. Em uma tigela, escalde o polvilho com a mistura fervente.\n3. Deixe amornar e adicione os ovos e o queijo, misturando bem até obter uma massa homogênea.\n4. Modele bolinhas e asse em forno preaquecido a 180°C por cerca de 25 minutos.','- 500g de polvilho doce\n- 1 copo (americano) de leite\n- 1 copo (americano) de água\n- 1/2 copo (americano) de óleo\n- 2 ovos\n- 200g de queijo minas padrão ralado\n- Sal a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(71,4,12,'Sopa de Legumes Light',40,4,'1. Em uma panela, refogue a cebola e o alho no azeite.\n2. Adicione os legumes picados e cubra com água.\n3. Cozinhe até os legumes ficarem macios.\n4. Tempere com sal e pimenta e sirva.','- 1 abobrinha picada\n- 2 cenouras picadas\n- 1 chuchu picado\n- 1 talo de salsão picado\n- 1 cebola picada\n- 2 dentes de alho picados\n- Sal e pimenta do reino a gosto\n- Azeite a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(72,1,12,'Omelete de Claras com Espinafre',15,1,'1. Em uma tigela, bata as claras com um garfo.\n2. Tempere com sal e pimenta.\n3. Em uma frigideira antiaderente, refogue o espinafre no azeite.\n4. Despeje as claras sobre o espinafre e cozinhe em fogo baixo até firmar.\n5. Dobre a omelete e sirva.','- 3 claras de ovo\n- 1 xícara de folhas de espinafre\n- Sal e pimenta do reino a gosto\n- 1 fio de azeite','2025-08-19 18:46:23','2025-08-19 18:46:23'),(73,1,13,'Salada de Quinoa com Legumes',25,4,'1. Cozinhe a quinoa conforme as instruções da embalagem.\n2. Em uma tigela, misture a quinoa cozida com os legumes picados.\n3. Tempere com azeite, suco de limão, sal e pimenta.\n4. Sirva fria ou em temperatura ambiente.','- 1 xícara de quinoa\n- 1 pepino picado\n- 1 tomate picado\n- 1/2 pimentão amarelo picado\n- Salsinha picada a gosto\n- Suco de 1 limão\n- Azeite de oliva a gosto\n- Sal e pimenta do reino a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23'),(74,4,13,'Frango Grelhado com Brócolis e Batata Doce',35,2,'1. Cozinhe a batata doce no vapor até ficar macia.\n2. Tempere o filé de frango com sal, pimenta e alho.\n3. Grelhe o frango em uma frigideira antiaderente.\n4. Cozinhe o brócolis no vapor.\n5. Sirva o frango grelhado com a batata doce e o brócolis.','- 2 filés de frango\n- 1 batata doce média\n- 1 xícara de brócolis em floretes\n- 1 dente de alho picado\n- Sal e pimenta do reino a gosto','2025-08-19 18:46:23','2025-08-19 18:46:23');
/*!40000 ALTER TABLE `receitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '\n',
  `nome` varchar(100) DEFAULT NULL,
  `login` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `criado_em` datetime NOT NULL,
  `alterado_em` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Eduardo','Edu','$2a$10$B3JmsDLAcyiLYEp6Yh/1cOanHak28UoP66FjEn9OVWq5402PPWk5S','2025-08-19 18:23:46','2025-08-19 18:23:46'),(4,'a4pm','a4pm','$2b$10$vc7vpOBJe3obqlOEsFY7GeuUE7TS7d6lGngEiAEIvHOjyxqI4176K','2025-08-19 18:23:46','2025-08-19 18:23:46');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-19 16:05:21
