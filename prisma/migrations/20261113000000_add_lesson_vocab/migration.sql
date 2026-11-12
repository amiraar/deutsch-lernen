-- LessonVocab was added to schema.prisma without a migration, so a fresh
-- database built with `prisma migrate deploy` lacks the table and the seed
-- fails. Databases created with `prisma db push` already have it, so every
-- statement here is a no-op when the table and constraints exist.

-- CreateTable
CREATE TABLE IF NOT EXISTS "LessonVocab" (
    "lessonId" TEXT NOT NULL,
    "vocabWordId" TEXT NOT NULL,

    CONSTRAINT "LessonVocab_pkey" PRIMARY KEY ("lessonId","vocabWordId")
);

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'LessonVocab_lessonId_fkey') THEN
        ALTER TABLE "LessonVocab" ADD CONSTRAINT "LessonVocab_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'LessonVocab_vocabWordId_fkey') THEN
        ALTER TABLE "LessonVocab" ADD CONSTRAINT "LessonVocab_vocabWordId_fkey" FOREIGN KEY ("vocabWordId") REFERENCES "VocabWord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
