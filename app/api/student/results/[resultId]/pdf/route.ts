import React from "react";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getCurrentUser } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";
import {
  getClassAverage,
  getClassSubjectMetrics,
} from "@/lib/results/rankings";
import {
  getClassSubjectOrder,
  sortBySubjectOrder,
} from "@/lib/results/subject-order";
import StudentReportPdfDocument, {
  type StudentReportPdfData,
} from "@/components/pdf/StudentReportPdfDocument";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resultId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401, headers: NO_STORE }
    );
  }

  const { resultId } = await params;

  const result = await prisma.result.findUnique({
    where: { id: resultId },
    include: {
      student: {
        select: {
          id: true,
          userId: true,
          firstName: true,
          otherName: true,
          surname: true,
          admissionNumber: true,
          sex: true,
          schoolClass: { select: { name: true } },
        },
      },
      teacher: {
        select: { firstName: true, otherName: true, surname: true },
      },
      schoolClass: { select: { name: true } },
      term: {
        select: {
          id: true,
          name: true,
          session: { select: { name: true } },
        },
      },
      subjects: {
        include: {
          subject: { select: { name: true, code: true } },
        },
      },
    },
  });

  if (!result) {
    return NextResponse.json(
      { error: "Result not found." },
      { status: 404, headers: NO_STORE }
    );
  }

  // ---- Access control -----------------------------------------------------
  const isPublished = result.status === "PUBLISHED";
  const isApprovedOrPublished = isPublished || result.status === "APPROVED";

  if (user.role === "STUDENT") {
    if (result.student.userId !== user.id) {
      return NextResponse.json(
        { error: "Result not found." },
        { status: 404, headers: NO_STORE }
      );
    }
    if (!isApprovedOrPublished) {
      return NextResponse.json(
        {
          error:
            "This result has not been approved yet. It will be available once school administration approves it.",
        },
        { status: 403, headers: NO_STORE }
      );
    }
  } else if (user.role === "TEACHER") {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: user.id },
      select: { classId: true },
    });
    if (!teacher || teacher.classId !== result.classId) {
      return NextResponse.json(
        { error: "You are not authorized to view this result." },
        { status: 403, headers: NO_STORE }
      );
    }
    if (!isApprovedOrPublished) {
      return NextResponse.json(
        { error: "This result has not been approved yet." },
        { status: 403, headers: NO_STORE }
      );
    }
  } else if (user.role === "ADMIN") {
    if (!isApprovedOrPublished) {
      return NextResponse.json(
        { error: "This result has not been approved yet." },
        { status: 403, headers: NO_STORE }
      );
    }
  } else {
    return NextResponse.json(
      { error: "You are not authorized to view this result." },
      { status: 403, headers: NO_STORE }
    );
  }
  // -------------------------------------------------------------------------

  const [classAverage, subjectMetrics, subjectOrder] = await Promise.all([
    getClassAverage(result.classId, result.termId),
    getClassSubjectMetrics(result.classId, result.termId),
    getClassSubjectOrder(result.classId),
  ]);

  const orderedSubjects = sortBySubjectOrder(result.subjects, subjectOrder);

  const studentFullName = [
    result.student.firstName,
    result.student.otherName,
    result.student.surname,
  ]
    .filter(Boolean)
    .join(" ");

  const teacherFullName = [
    result.teacher.firstName,
    result.teacher.otherName,
    result.teacher.surname,
  ]
    .filter(Boolean)
    .join(" ");

  const mappedSubjects = orderedSubjects.flatMap((s) => {
    if (s.caScore === null || s.examScore === null || s.totalScore === null) {
      return [];
    }

    const metric = subjectMetrics.metricsByResultSubject.get(
      `${result.id}:${s.subjectId}`
    );

    return [
      {
        id: s.id,
        subjectName: s.subject.name,
        subjectCode: s.subject.code,
        caScore: Number(s.caScore),
        examScore: Number(s.examScore),
        totalScore: Number(s.totalScore),
        grade: s.grade,
        remark: s.remark,
        classAverage: metric?.classAverage ?? null,
        subjectPosition: metric?.subjectPosition ?? null,
      },
    ];
  });

  const pdfData: StudentReportPdfData = {
    student: {
      name: studentFullName,
      admissionNumber: result.student.admissionNumber,
      className: result.schoolClass.name,
      sex: result.student.sex ?? undefined,
    },
    result: {
      id: result.id,
      schoolClass: result.schoolClass.name,
      reviewedAt: result.reviewedAt?.toISOString() ?? null,
      term: {
        name: result.term.name,
        sessionName: result.term.session.name,
      },
      overallAverage:
        result.overallAverage !== null ? Number(result.overallAverage) : null,
      classAverage,
      classPosition: result.classPosition,
      classSize: result.classSize,
      teacherRemark: result.teacherRemark,
      headTeacherRemark: result.headTeacherRemark,
      teacherName: teacherFullName,
      psychomotor: result.psychomotor as Record<string, number | null> | null,
      subjects: mappedSubjects,
    },
  };

  try {
    const doc = React.createElement(StudentReportPdfDocument, { data: pdfData });
    const buffer = await renderToBuffer(doc as any);

    const safeStudentName = studentFullName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${safeStudentName}_${result.term.name}_Term_Report.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (renderError) {
    console.error("PDF generation error:", renderError);
    return NextResponse.json(
      { error: "Failed to generate report sheet PDF." },
      { status: 500, headers: NO_STORE }
    );
  }
}