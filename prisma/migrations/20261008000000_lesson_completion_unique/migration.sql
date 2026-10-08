-- Removes duplicate lesson completions so the unique index below can be created.
-- Keeps the earliest completion per (userId, lessonId); XP already awarded is left alone.
DELETE FROM "LessonCompletion"
WHERE "id" IN (
    SELECT "id"
    FROM (
        SELECT "id",
               ROW_NUMBER() OVER (
                   PARTITION BY "userId", "lessonId"
                   ORDER BY "completedAt" ASC, "id" ASC
               ) AS rn
        FROM "LessonCompletion"
    ) ranked
    WHERE rn > 1
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonCompletion_userId_lessonId_key" ON "LessonCompletion"("userId", "lessonId");
