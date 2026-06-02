# AllBerto
**Sistema de Gestão e Reserva de Vagas de Estacionamento**

---

## Equipe do Projeto
* **Gabriel Ernesto:** Product Owner, estruturação de frontend, maturação e diligência criativa.
* **Pedro Lima:** Desenvolvedor backend e arquitetura de banco de dados.
* **Matheus Furtado:** Desenvolvedor frontend e estruturação de interface.
* **Thomas Anderson:** Desenvolvedor frontend e idealização do protótipo.

---

## Definição da Solução e Problema

### Problema Resolvido
Florianópolis enfrenta graves gargalos de mobilidade urbana durante temporadas de veraneio, feriados prolongados e eventos festivos (como o Ano Novo). O resultado imediato desse fluxo é o congestionamento severo e a perda de tempo dos motoristas na busca por vagas de estacionamento.

### Solução
O AllBerto é uma plataforma multiplataforma (Web e Mobile) desenvolvida para gerenciar e reservar vagas de maneira antecipada. O sistema permite que proprietários de terrenos e estacionamentos gerenciem o fluxo de aluguel e receita, enquanto motoristas asseguram sua vaga antes mesmo de sair de casa.

### Público-Alvo
* **Vendedores:** Proprietários de estacionamentos comerciais ou terrenos ociosos em áreas de alta demanda (como praias e centros urbanos).
* **Usuários/Clientes:** Condutores de veículos (carros, motos e caminhões), compreendendo tanto os moradores nativos da região quanto turistas de fora da ilha.

### Diferencial
Diferente de soluções de mapas genéricas, o AllBerto opera de forma especializada no nicho de reservas integradas com rotas. Ele transforma vagas ociosas particulares em pontos comerciais ativos, garantindo previsibilidade de tráfego para a cidade e eliminando o tempo de procura por vagas em filas de trânsito.

---

## Modelos de Monetização e Justificativa

O modelo de negócios foi projetado para garantir a escalabilidade da plataforma através de duas frentes:

**Assinatura Mensal (SaaS):** Taxa fixa cobrada dos vendedores cadastrados para uso do dashboard de controle, edição de preços e manipulação de fluxo.
   * *Justificativa:* Garante uma receita previsível e recorrente para a manutenção da infraestrutura de servidores do sistema.
2. **Marketplace com Comissão (Taxa por Transação):** Retenção de uma taxa de aproximadamente **5%** sobre o valor de cada vaga disponibilizada e locada pela plataforma.
   * *Justificativa:* Alinha o crescimento da receita da plataforma ao sucesso financeiro do vendedor, tornando a entrada no aplicativo de baixo risco para o parceiro.

---

## Especificações Técnicas

### Stack Tecnológica
* **Frontend:** HTML5, CSS3, Bootstrap, JavaScript.
* **Backend:** Node.js, Express, Cors, mysql2, dotenv.
* **Banco de Dados:** MySQL.

### Funcionalidades Implementadas
* **Autenticação de Usuários:** Sistema de cadastro e login segregado por tipo de perfil.
* **CRUD de Estacionamentos:** Módulo completo para criação, leitura, atualização e exclusão de pátios comerciais.
* **Gestão de Horários:** Configuração de janelas de funcionamento e disponibilidade de vagas.
* **Interface Responsiva:** Modelo de navegação fluida compatível com Desktop e dispositivos Mobile.

---

## Instruções de Execução

### Pré-requisitos e Credenciais do Banco de Dados
Certifique-se de ter o MySQL instalado e configurado localmente com os seguintes parâmetros contidos no arquivo de conexão:
* **Usuário DB:** `root`
* **Senha DB:** `senai`

### Procedimento de Inicialização
Abra o terminal na raiz do projeto e execute a sequência abaixo:

```bash
# 1. Navegar até a pasta do servidor backend
cd backend

# 2. Inicializar o servidor Node.js
node server.js

```
> **Nota:** Não é necessário executar npm install, os módulos locais já estão estruturados na pasta de desenvolvimento atual.
>
## 6. Estrutura do Banco de Dados
O banco de dados é composto por duas entidades principais relacionadas à operação:
 * usuarios: Armazena as credenciais de acesso, diferenciando motoristas e vendedores pelo atributo tipo.
 * estacionamentos: Registra os pátios comerciais vinculados aos bairros correspondentes.
### Script SQL (MySQL)
```sql
-- -----------------------------------------------------
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
  `bairro` VARCHAR(255) NOT NULL,
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

```
Documentação de Projeto - AllBerto 2024**
```


```