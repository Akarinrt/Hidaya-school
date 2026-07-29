import { PrismaClient } from '@prisma/client';
import FlashcardClient from './FlashcardClient';

const prisma = new PrismaClient();

export default async function ClassFlashcardsPage({ params }: { params: any }) {
  const { id } = await params;

  const decks = await prisma.flashcardDeck.findMany({
    where: { classId: id },
    include: { cards: true },
    orderBy: { createdAt: 'desc' }
  });

  return <FlashcardClient decks={decks} />;
}
