const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const hws = await prisma.homework.findMany({
      include: {
        submissions: true
      }
    });
    console.log("Homeworks inside database:");
    hws.forEach(hw => {
      console.log(`- ID: ${hw.id}`);
      console.log(`  Title: ${hw.title}`);
      console.log(`  Type: ${hw.type}`);
      console.log(`  QuizData length: ${hw.quizData ? hw.quizData.length : 'null'}`);
      console.log(`  Submissions count: ${hw.submissions.length}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
