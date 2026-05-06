import { authRouter } from "@/server/routers/auth";
import { flashcardRouter } from "@/server/routers/flashcard";
import { lessonRouter } from "@/server/routers/lesson";
import { progressRouter } from "@/server/routers/progress";
import { tutorRouter } from "@/server/routers/tutor";
import { router } from "@/server/trpc";

export const appRouter = router({
	auth: authRouter,
	lesson: lessonRouter,
	flashcard: flashcardRouter,
	progress: progressRouter,
	tutor: tutorRouter,
});

export type AppRouter = typeof appRouter;
