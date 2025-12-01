// prisma.config.js
const { defineConfig } = require("@prisma/config");
const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    provider: "postgresql",
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "node ./prisma/seed.js",
  },
});
