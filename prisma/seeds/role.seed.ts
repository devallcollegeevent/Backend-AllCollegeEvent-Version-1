const prisma = require('../../src/config/db.config.ts'); 

async function seedRoles() {
    // NOTE: This assumes you have a 'Role' model defined in your schema.prisma
    try {
        await prisma.role.createMany({
            data: [
                {name:"admin"},
                { name: "org" },
                { name: "user" }
            ],
            skipDuplicates: false, // prevents duplicate inserts if run multiple times
        });
        console.log("✔ Roles seeded successfully.");
    } catch (error) {
        console.error("Error seeding roles:", error);
        // Throwing the error here allows the main seed.js function to catch it and disconnect.
        throw error;
    }
}

// Export the function using CommonJS syntax
module.exports = {
    seedRoles,
};