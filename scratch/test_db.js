const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Checking database connection...");
    const results = await prisma.testResult.findMany();
    console.log("Success! Found", results.length, "test results.");
    console.log(results);
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
