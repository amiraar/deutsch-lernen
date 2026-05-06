import * as React from "react";

import { ProgressBar } from "@/components/ui";

export type LessonProgressProps = {
  current: number;
  total: number;
  xpEarned: number;
  elapsedSeconds: number;
};

function formatElapsed(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Shows lesson progress, XP earned, and elapsed time.
 */
export function LessonProgress({
  current,
  total,
  xpEarned,
  elapsedSeconds,
}: LessonProgressProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {current}/{total} latihan
        </span>
        <span>XP: {xpEarned}</span>
        <span>{formatElapsed(elapsedSeconds)}</span>
      </div>
      <ProgressBar value={progress} />
    </div>
  );
}
