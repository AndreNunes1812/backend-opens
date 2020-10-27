# ☕️ Projeto API
  Esse projeto tem como finalidade avaliar o conhecimento tecnico de backend na stack JavaScrit, para a empresa **[OPENS](https://opens.com.br)**

## Objetivo:
  Criar uma **API** para que possa ser feita a autenticação, inserir , atualizar e deletar o usuario.

## Especificação do Projeto:

  criar autenticação, inserir usuario, editar usuario e excluir usuario.

  Ser escrito em NodeJS e usar uma banco de dados

  Aceitar apenas solicitações autenticadas e o token mestre precisa ser
  o único que cria e exclui usuários.

  As credenciais do usuário podem editar e visualizar seus próprios dados.

  **História do usuário**
  O token mestre cria um novo usuário com dados básicos: login, senha, nome, e-mail.

  O usuário pode editar e visualizar seus dados através de uma solicitação de API.

  O Token mestre excluirá o usuario

## Desenvolvimento:

  para a geração do projeto utilizei as seguintes dependencias:

  [Node](https://nodejs.org)  => V.10.19.0

  [Typescript](https://www.typescriptlang.org/)   => V.04.0.3

  [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) => V.2.4.3

  [body-parser](https://www.npmjs.com/package/body-parser)  => V.1.19.0

  [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) => V.2.8.5

  [express](https://expressjs.com/) => V.4.17.1

  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) => V.8.5.1

  [pg](https://www.postgresql.org/) => V.8.4.2

  [typeorm](https://typeorm.io/#/)  => V.0.2.28

  [uuidv4](https://www.npmjs.com/package/uuidv4) => V.6.2.4

  [insomnia](https://insomnia.rest/download/)

  [DBeaver](https://dbeaver.io/)


  #Baixar o projeto?

  O Banco de dados foi criado no docker, para a execução do mesmo digite na linha de comando o seguinte:

  **sudo docker run --name opens-postgrees -e POSTGRES_PASSWORD=opens -p 5432:5432 -d  postgres**

  onde:

        sudo somente em maquinas linux ou macos

        opens-postgrees nome do container

        opens é a senha do postgree dentro do container.

        comandos docker para verificar se o container está válido.

        docker ls -la, mostra todos os container

        docker rm container(id)

        para demais comando digite docker --help

  DBeaver: programa utilizado para gerenciar o banco de dados postgreSQL
        após baixar e instalar o programa conforme seu sistema operacional, entre em criar banco de dados escolha PostgreSQL e após selecionar entre com as seguintes informações:

        Host: localhost
        porta: 5432
        username: postgres
        password: opens

        essa configuração é necessária para acessar o banco de dados, após isso deverá ser criado o banco de dados do projeto.

        clicar em cima de postgreSql e com botão direito do mouse clicar em criar banco de dados deverá abrir uma janela para incluir o nome do banco de dados:

        opensdb

  Após ter finalizado esses procedimento poderá baixar o projeto conforme o comando abaixo:

  Atenção! será necessário baixar o seu github em sua maquina

  digite:

  git clone https://github.com/AndreNunes1812/backend-opens.git

  apos baixar o projeto entre na pasta criada e execute **yarn** para instalar todas as dependencias.

  a) digite **yarn migration:run** para gerar a(s) tabela(s) necessaria(s).

  b) digite **yarn dev:service** para executar a **API**.

  c) Isomnia  ferramenta utilizada para criação das requisições:

    foram utilizadas as seguintes chamadas:

    POST => localhost:3333/sessions
        {
         "password": "123456",
         "email": "bianca.xpto@gmail.com"
         }


    POST => localhost:3333/users
             criar o usuario passando o token

            exemplo:
            {
              "login": "bianca",
              "password": "123456",
              "name": "Bianca",
              "email": "bianca.xpto@gmail.com"
            }


    GET => localhost:3333/users
           Lista todos os usuario cadastrados passando o token

    GET => localhost:3333/users/:id
           Lista usuario cadastrados por id e passar o token

    PUT => localhost:3333/users/:id
            Atualiza o usuario já cadastrado e passar o token


  ## Estrutura de Pastas

    src
      @types
        foi utilzado para inserir o usuario dendo do Resquest.
      config
        foi criado o arquivo auth para a configuracao do JWT (secret e expiresIN)
      database
        migrations
          criação da base de dados
      middlewares
          foram criado para validar verificar se o token valido.
      models
          foram criados a estrutura da Tabela de User
      repositories
          foram criados as regras de negocio da aplicacao.
      routes
           foram criado as rotas auth e User
      services
           foram criado os servicos de authenticação e Usuario


      Nota: **Existe diversas formas para criação de uma API, esse foi a maneira que fiz por entender que no dia dia a api precisa ser escalavel.**
