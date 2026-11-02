import "server-only";
import { prisma } from "@/lib/prisma";

const round2 = (n: number) => Number(n.toFixed(2));

export class RankingNotReadyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RankingNotReadyError";
  }
}

/**
 * Percentage for one student = average of their subject totals.
 * Every subject is out of 100, so this equals
 *   (sum of totals) / (number of subjects x 100) x 100
 * Using the average (not the raw sum) keeps it fair when students
 * take different numbers of subjects.
 *
 * Call this every time a result's subject scores are saved,
 * then store the value in Result.overallAverage.
 */
export function calculateOverallAverage(totals: (number | null)[]) {
  const scored = totals.filter((t): t is number => t !== null);
  if (scored.length === 0) return null;
  return round2(scored.reduce((a, b) => a + b, 0) / scored.length);
}

/**
 * Standard competition ranking: equal averages share a position and the
 * next position is skipped (1, 2, 2, 4). Ranks on the ROUNDED value, so two
 * students who both show 78.50 always get the same position.
 */
export function rankByAverage(items: { id: string; average: number }[]) {
  const sorted = [...items].sort((a, b) => b.average - a.average);
  let position = 0;
  let previous: number | null = null;
  return sorted.map((item, i) => {
    if (item.average !== previous) {
      position = i + 1;
      previous = item.average;
    }
    return { id: item.id, position };
  });
}

/**
 * Work out and STORE class positions for one class in one term.
 * Run it when the admin publishes the class, after every result in the
 * class is approved. If any result changes afterwards, run it again.
 */
export async function finalizeClassPositions(
  classId: string,
  termId: string,
  opts: { allowMissing?: boolean } = {}
) {
  const [results, activeStudents] = await Promise.all([
    prisma.result.findMany({
      where: { classId, termId },
      select: {
        id: true,
        status: true,
        overallAverage: true,
        subjects: { select: { totalScore: true } },
      },
    }),
    prisma.student.count({ where: { classId, status: "ACTIVE" } }),
  ]);

  const notApproved = results.filter(
    (r) => r.status !== "APPROVED" && r.status !== "PUBLISHED"
  );
  if (notApproved.length > 0) {
    throw new RankingNotReadyError(
      `${notApproved.length} result(s) in this class are not approved yet.`
    );
  }

  const withAverages = results.map((result) => ({
    id: result.id,
    average:
      result.overallAverage === null
        ? calculateOverallAverage(
            result.subjects.map((subject) =>
              subject.totalScore === null ? null : Number(subject.totalScore)
            )
          )
        : Number(result.overallAverage),
  }));

  const scored = withAverages.filter(
    (result): result is { id: string; average: number } => result.average !== null
  );
  if (scored.length !== withAverages.length) {
    throw new RankingNotReadyError(
      `${withAverages.length - scored.length} result(s) have no scores.`
    );
  }

  const missing = activeStudents - results.length;
  if (missing > 0 && !opts.allowMissing) {
    throw new RankingNotReadyError(
      `${missing} student(s) in this class have no result yet.`
    );
  }

  const ranked = rankByAverage(scored);
  const averageById = new Map(scored.map((result) => [result.id, result.average]));

  // One batch: either every position is saved or none is.
  await prisma.$transaction(
    ranked.map((result) =>
      prisma.result.update({
        where: { id: result.id },
        data: {
          overallAverage: averageById.get(result.id),
          classPosition: result.position,
          classSize: results.length,
        },
      })
    )
  );

  return { classSize: results.length, classAverage: await getClassAverage(classId, termId) };
}

export async function tryFinalizeClassPositions(
  classId: string,
  termId: string,
  opts: { allowMissing?: boolean } = {}
) {
  try {
    return await finalizeClassPositions(classId, termId, opts);
  } catch (error) {
    if (error instanceof RankingNotReadyError) return null;
    throw error;
  }
}

/** Average of the class's percentages (approved or published results only). */
export async function getClassAverage(classId: string, termId: string) {
  const { _avg } = await prisma.result.aggregate({
    where: { classId, termId, status: { in: ["APPROVED", "PUBLISHED"] } },
    _avg: { overallAverage: true },
  });
  return _avg.overallAverage === null ? null : round2(Number(_avg.overallAverage));
}

/**
 * Subject metrics (class average and student ranking per subject) for a class in a given term.
 */
export async function getClassSubjectMetrics(classId: string, termId: string) {
  const rows = await prisma.resultSubject.findMany({
    where: {
      result: {
        classId,
        termId,
        status: { in: ["APPROVED", "PUBLISHED"] },
      },
      totalScore: { not: null },
    },
    select: {
      id: true,
      resultId: true,
      subjectId: true,
      totalScore: true,
    },
  });

  const bySubject = new Map<string, { resultId: string; totalScore: number }[]>();
  for (const row of rows) {
    if (row.totalScore === null) continue;
    const score = Number(row.totalScore);
    const list = bySubject.get(row.subjectId) ?? [];
    list.push({ resultId: row.resultId, totalScore: score });
    bySubject.set(row.subjectId, list);
  }

  const metricsByResultSubject = new Map<
    string,
    { classAverage: number; subjectPosition: number }
  >();
  const classAverageBySubject = new Map<string, number>();

  for (const [subjectId, scores] of bySubject.entries()) {
    if (scores.length === 0) continue;
    const sum = scores.reduce((acc, s) => acc + s.totalScore, 0);
    const avg = round2(sum / scores.length);
    classAverageBySubject.set(subjectId, avg);

    const sorted = [...scores].sort((a, b) => b.totalScore - a.totalScore);
    let position = 0;
    let prevScore: number | null = null;
    for (let i = 0; i < sorted.length; i++) {
      const item = sorted[i];
      if (item.totalScore !== prevScore) {
        position = i + 1;
        prevScore = item.totalScore;
      }
      metricsByResultSubject.set(`${item.resultId}:${subjectId}`, {
        classAverage: avg,
        subjectPosition: position,
      });
    }
  }

  return {
    metricsByResultSubject,
    classAverageBySubject,
  };
}