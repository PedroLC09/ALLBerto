-- Schema allberto_db_2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `allberto_db_2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `allberto_db_2` ;

-- -----------------------------------------------------
-- Table `allberto_db_2`.`estacionamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allberto_db_2`.`estacionamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_estacionamento` VARCHAR(100) NOT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `allberto_db_2`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allberto_db_2`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE);