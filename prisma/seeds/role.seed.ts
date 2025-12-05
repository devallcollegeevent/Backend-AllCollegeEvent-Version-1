const prisma = require("../../src/config/db.config.ts");

async function seedRoles() {
  try {
    await prisma.role.createMany({
      data: [{ name: "admin" }, { name: "org" }, { name: "user" }],
      skipDuplicates: false,
    });
    console.log("Roles seeded successfully.");
  } catch (error) {
    console.error("Error seeding roles:", error);
    throw error;
  }
}

module.exports = {
  seedRoles,
};
