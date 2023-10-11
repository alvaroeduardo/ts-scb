# Documentação do Projeto ts-scb

## Visão Geral

O **ts-scb** (Sistema de Controle de Bibliotecas - Back-end) é um sistema desenvolvido em TypeScript para gerenciar operações relacionadas a bibliotecas. Este projeto oferece uma API robusta para facilitar o controle de recursos em bibliotecas, incluindo funcionalidades como autenticação, manipulação de livros e gestão de usuários.

## Instalação

Certifique-se de ter o Node.js e o npm instalados em sua máquina antes de prosseguir.

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/alvaroeduardo/ts-scb.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd ts-scb
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Uso

Para iniciar o servidor em modo de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
```

O servidor estará acessível em [http://localhost:3333](http://localhost:3333).

## Tecnologias Principais

- [Fastify](https://www.fastify.io/) - Framework web rápido e eficiente para Node.js.
- [Prisma](https://www.prisma.io/) - ORM para interação com o banco de dados.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Implementação de JSON Web Tokens (JWT) para autenticação.
- [Zod](https://github.com/colinhacks/zod) - Biblioteca de validação de esquemas para TypeScript.


# Documentação das Rotas

## Endpoint: `/login` (POST)

### Descrição
Realiza o login de um usuário com base nas credenciais fornecidas.

### Parâmetros da Solicitação
- **email**: E-mail do usuário (string).
- **password**: Senha do usuário (string).

### Respostas
- **200 OK**: Login bem-sucedido.
  ```json
  {
    "message": "Logged in successfully. Welcome [Nome do Usuário]",
    "token": "[Token JWT]"
  }
  ```

- **400 Bad Request**: Falha no login devido a e-mail ou senha incorretos.
  ```json
  {
    "message": "Wrong email or password. Check the data and try again."
  }
  ```

- **400 Bad Request**: Falha no login devido a e-mail não registrado.
  ```json
  {
    "message": "Email not registered. Check or contact your administrator."
  }
  ```

## Endpoint: `/user` (POST)

### Descrição
Cria um novo usuário com as informações fornecidas.

### Parâmetros da Solicitação
- **name**: Nome do usuário (string).
- **role**: Papel do usuário (string).
- **email**: E-mail do usuário (string).
- **password**: Senha do usuário (string).

### Respostas
- **201 Created**: Usuário criado com sucesso.
  ```json
  {
    "user": {...},
    "message": "User created successfully."
  }
  ```

- **400 Bad Request**: Falha na criação devido a nome de usuário já existente.
  ```json
  {
    "message": "Existing username, try another name."
  }
  ```

## Endpoint: `/user/all` (GET)

### Descrição
Retorna a lista de todos os usuários.

### Respostas
- **200 OK**: Lista de usuários.
  ```json
  {
    "users": [...]
  }
  ```

## Endpoint: `/user/:id` (GET)

### Descrição
Retorna as informações de um usuário com base no ID fornecido.

### Parâmetros da Solicitação
- **id**: ID do usuário (UUID string).

### Respostas
- **200 OK**: Informações do usuário encontrado.
  ```json
  {
    "existingUser": {...}
  }
  ```

- **400 Bad Request**: Usuário não encontrado.
  ```json
  {
    "message": "User not found. Check the ID entered."
  }
  ```

## Endpoint: `/user/update/:id` (PUT)

### Descrição
Atualiza as informações de um usuário com base no ID fornecido.

### Parâmetros da Solicitação
- **id**: ID do usuário (UUID string).
- **name** (opcional): Novo nome do usuário (string).
- **role** (opcional): Novo papel do usuário (string).
- **password** (opcional): Nova senha do usuário (string).

### Respostas
- **200 OK**: Informações do usuário atualizadas com sucesso.
  ```json
  {
    "message": "User data updated successfully."
  }
  ```

- **400 Bad Request**: Falha na atualização devido à senha anterior sendo reutilizada.
  ```json
  {
    "message": "Enter a different password. You cannot use the same password as the previous one."
  }
  ```

- **400 Bad Request**: Usuário não encontrado.
  ```json
  {
    "message": "User not found. Check the ID entered."
  }
  ```

## Endpoint: `/user/delete/:id` (DELETE)

### Descrição
Exclui um usuário com base no ID fornecido.

### Parâmetros da Solicitação
- **id**: ID do usuário (UUID string).

### Respostas
- **200 OK**: Usuário excluído com sucesso.
  ```json
  {
    "message": "User deleted successfully."
  }
  ```

- **400 Bad Request**: Usuário não encontrado.
  ```json
  {
    "message": "User not found. Check the ID entered."
  }
  ```

## Contribuindo

Sinta-se à vontade para contribuir para o desenvolvimento deste projeto. Crie issues para relatar problemas ou abrir solicitações de novos recursos.

[Link para issues](https://github.com/alvaroeduardo/ts-scb/issues)

## Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

Para mais informações, consulte a documentação completa em [https://github.com/alvaroeduardo/ts-scb#readme](https://github.com/alvaroeduardo/ts-scb#readme).