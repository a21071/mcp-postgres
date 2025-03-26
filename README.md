# MCP PostgreSQL Server

-<img src="assets/logo.svg" width="256" height="256" alt="MCP Postgres Logo" />

A Model Context Protocol (MCP) server that provides PostgreSQL database operations through MCP tools.

## Features

- CRUD operations for User and Post entities
- Type-safe database operations using Prisma
- MCP-compatible tool interface
- Built with TypeScript for type safety

## Installation

1. Clone the repository
2. Install dependencies:

```bash
git clone https://github.com/a21071/mcp-postgres.git
cd mcp-postgres
npm install
```

3. Set up PostgreSQL database:

```bash
docker-compose up -d
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Build the project:

```bash
npm run build
```

## Usage

Run the server:

```bash
npm start
```

### Available MCP Tools

- **getData**: Retrieve user data from PostgreSQL

  ```json
  {
    "tableName": "user"
  }
  ```

- **addUserData**: Add new user to database

  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "age": 30
  }
  ```

- **deleteUserData**: Delete user by ID, email or name

  ```json
  {
    "id": "clxyz...",
    "email": "user@example.com",
    "name": "John Doe"
  }
  ```

- **updateUserData**: Update user information
  ```json
  {
    "id": "clxyz...",
    "email": "new@example.com",
    "name": "New Name"
  }
  ```

## Database Schema

The server uses the following Prisma schema:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  age       Int?
  createdAt DateTime @default(now())
  posts     Post[]
}

```

## Development

- Watch mode:

```bash
npm run watch
```

## Dependencies

- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) - MCP server SDK
- [Prisma](https://www.prisma.io/) - Type-safe database client
- [TypeScript](https://www.typescriptlang.org/) - Type checking

## License

MIT
