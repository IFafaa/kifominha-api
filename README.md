# Teste Angular Gastronomia
## Objetivo

Suponha que você tenha sido solicitado a desenvolver 
uma plataforma no ramo de gastronomia. O cliente 
solicitou um MVP para validar seu conhecimento

## Ambiente

[Ambiente](https://kifominha-api.onrender.com)

## Tecnologias

- Back-end:
NestJS,
TypeORM,
Nodemailer

- Cloud:
Firebase storage

- DataBase: 
MongoDB

## Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

* Node.js (versão 20 ou superior)

## Iniciando o projeto
Siga as etapas abaixo para iniciar o projeto em sua máquina local:

Clone este repositório para o diretório desejado em sua máquina:

```
git clone https://github.com/IFafaa/kifominha-api
```

Navegue até o diretório do projeto:

```
cd kifominha-api
```

Altere o ambiente para o ambiente de desenvolvimento:

```
git checkout develop
```

Instale as dependências do projeto utilizando o npm (gerenciador de pacotes do Node.js):

```
npm install
```

Após a conclusão da instalação das dependências, você pode iniciar o servidor de desenvolvimento executando o seguinte comando:

```
npm run start:dev
```

O servidor de desenvolvimento será iniciado e estará disponível no endereço http://localhost:4200/. Acesse este endereço em seu navegador para ver o aplicativo em execução.

## Estrutura

O projeto utiliza de uma estrutura de pastas a nivel de modulos com as principais pastas sendo:

* <b>Database</b>: Esta pasta contém arquivos essenciais para a integração com um banco de dados. Aqui, você pode encontrar scripts de criação de banco de dados, arquivos de configuração de conexão ou até mesmo arquivos de migração de banco de dados.

* <b>Common</b>: Onde ficarão os arquivos utilizados em todo o projeto - Ex: Enums, Helpers, interfaces, middlewares, services, templates;

* <b>Modules</b>: São as páginas do nosso projeto onde estarão os fluxos.

Dentro de um módulo, é comum criar segmentos de pastas adicionais para organizar os diferentes tipos de artefatos que são específicos daquele módulo. Alguns exemplos comuns de segmentos de pastas dentro de um módulo incluem  <b>Dtos</b>,  <b>Entities</b>,

* <b>Dtos</b>: O segmento de pastas Dtos é usado para realizar a validacao das requests.

* <b>Entities</b>: O segmento de pastas Entities é usado para armazenar as entidades do meu BD.


A criação desses segmentos de pastas ajuda a manter uma estrutura organizada do código, tornando mais fácil encontrar e gerenciar os diferentes artefatos relacionados ao módulo. Cada módulo pode ter sua própria estrutura de pastas específica, dependendo das necessidades e complexidade do aplicativo. Deixando ela escalavel para novos modulos caso o projeto necessite

