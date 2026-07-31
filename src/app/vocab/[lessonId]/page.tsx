import VocabClient from '../VocabClient';

export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return <VocabClient lessonId={lessonId} />;
}
