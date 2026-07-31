import { PrismaClient } from '@prisma/client';
import FlashcardClient from './FlashcardClient';
import { Suspense } from 'react';

const prisma = new PrismaClient();

export default async function ClassFlashcardsPage({ params }: { params: any }) {
  const { id } = await params;

  const decks = await prisma.flashcardDeck.findMany({
    where: { classId: id },
    include: { cards: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <Suspense fallback={<div>Đang tải bộ thẻ từ vựng...</div>}>
      <FlashcardClient decks={decks} />
    </Suspense>
  );
}
