### CRUD Blog Post with Prisma

### Step Installation

1. Clone the repository `git clone git@github.com:rachmizard/prisma-express.git`

2. Setup node_modules by typing on your terminal `yarn install`

3. Start Server with `yarn dev`

### Libraries

This repository contains some libraries that i use, including :

- Prisma & Prisma Client https://www.prisma.io/
- Express Draft Boilerplate
- dotenv
- http-errors
- morgan
- superstruct (for validating request body & parameters on express app)

### Prisma CLI Usage

- `npx prisma db pull` for sync your DB structures to prisma schema and it will be automatically generated on `schema.prisma` file
- `npx prisma db push` for update your schema DB structures to your DB migration
- `npx prisma generate dev` to generate prisma client notation type to your node modules

For further usage visit https://www.prisma.io/docs/concepts/components/prisma-cli/installation
