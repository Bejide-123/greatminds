import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Rect,
  Circle,
} from "@react-pdf/renderer";
import { Image } from "@react-pdf/renderer";
import { formatClassPosition, formatOrdinal } from "@/lib/results/format";
import { computeGrade } from "@/lib/gradebook-data";
import { PSYCHOMOTOR_TRAITS } from "@/lib/gradebook-api";
import path from "path";
import fs from "fs";

export type StudentReportPdfData = {
  student: {
    name: string;
    admissionNumber: string;
    className: string;
    sex?: string;
  };
  result: {
    id: string;
    schoolClass: string;
    reviewedAt: string | null;
    term: {
      name: "FIRST" | "SECOND" | "THIRD";
      sessionName: string;
    };
    overallAverage: number | null;
    classAverage: number | null;
    classPosition: number | null;
    classSize: number | null;
    teacherRemark: string | null;
    headTeacherRemark: string | null;
    teacherName: string;
    psychomotor?: Record<string, number | null> | null;
    subjects: {
      id: string;
      subjectName: string;
      subjectCode: string;
      caScore: number;
      examScore: number;
      totalScore: number;
      grade: string | null;
      remark: string | null;
      classAverage?: number | null;
      subjectPosition?: number | null;
    }[];
  };
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    fontSize: 7.5,
    fontFamily: "Helvetica",
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
  },
  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: "#0B1D3A",
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoContainer: {
    width: 44,
    height: 44,
  },
  schoolInfo: {
    flexDirection: "column",
  },
  schoolName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
    letterSpacing: 0.5,
  },
  schoolMotto: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Oblique",
    color: "#D97706",
    marginTop: 1,
  },
  schoolAddress: {
    fontSize: 6.5,
    color: "#475569",
    marginTop: 1,
  },
  schoolContact: {
    fontSize: 6,
    color: "#64748B",
    marginTop: 0.5,
  },
  headerRight: {
    alignItems: "flex-end",
    flexDirection: "column",
  },
  reportBadge: {
    backgroundColor: "#0B1D3A",
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  curriculumText: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: "#475569",
    textTransform: "uppercase",
  },
  dateIssued: {
    fontSize: 6.5,
    color: "#64748B",
    marginTop: 1,
  },

  // Biodata Section
  biodataGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 4,
    padding: 4,
    marginBottom: 6,
  },
  biodataCell: {
    width: "25%",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  biodataLabel: {
    fontSize: 5.5,
    fontFamily: "Helvetica-Bold",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  biodataValue: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
    marginTop: 1,
  },

  // KPI Summary Bar
  kpiRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 6,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    padding: 4,
    alignItems: "center",
  },
  kpiLabel: {
    fontSize: 5.5,
    fontFamily: "Helvetica-Bold",
    color: "#475569",
    textTransform: "uppercase",
  },
  kpiValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
    marginTop: 1,
  },
  kpiSub: {
    fontSize: 5.5,
    color: "#64748B",
  },

  // Table
  tableContainer: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0B1D3A",
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    paddingVertical: 3,
    paddingHorizontal: 2,
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 2.5,
    paddingHorizontal: 2,
    alignItems: "center",
  },
  tableRowEven: {
    backgroundColor: "#F8FAFC",
  },
  tableFooter: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderTopWidth: 1,
    borderTopColor: "#0B1D3A",
    paddingVertical: 3.5,
    paddingHorizontal: 2,
    alignItems: "center",
  },
  colNum: { width: "4%", textAlign: "center", fontSize: 6.5 },
  colSubject: {
    width: "32%",
    paddingLeft: 4,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
  },
  colScore: { width: "9%", textAlign: "center", fontSize: 7 },
  colTotal: {
    width: "10%",
    textAlign: "center",
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
  },
  colGrade: {
    width: "11%",
    textAlign: "center",
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
  },
  colRemark: { width: "12%", textAlign: "center", fontSize: 6.5 },
  colClassAvg: { width: "11%", textAlign: "center", fontSize: 7 },
  colPosition: {
    width: "11%",
    textAlign: "center",
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
  },

  // Middle Section (Grading Scale + Psychomotor)
  middleContainer: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  gradingScaleBox: {
    width: "42%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#F8FAFC",
  },
  psychomotorBox: {
    width: "58%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#F8FAFC",
  },
  sectionTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
    marginBottom: 3,
    textTransform: "uppercase",
    borderBottomWidth: 0.5,
    borderBottomColor: "#CBD5E1",
    paddingBottom: 2,
  },
  gradingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
    fontSize: 6,
  },
  gradingGrade: {
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
    width: "18%",
  },
  gradingRange: {
    width: "32%",
    color: "#475569",
  },
  gradingRemark: {
    width: "50%",
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
    color: "#059669",
  },

  // Psychomotor
  psychomotorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  psychomotorItem: {
    width: "48%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 1.5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
  },
  psychomotorItemFull: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 1.5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
  },
  psychomotorTraitName: {
    fontSize: 6,
    color: "#1E293B",
  },
  psychomotorRating: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
  },
  psychomotorSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
    paddingTop: 2,
    borderTopWidth: 0.5,
    borderTopColor: "#CBD5E1",
    fontSize: 6,
    color: "#475569",
  },

  // Bottom Sign-off Section
  signoffContainer: {
    flexDirection: "row",
    gap: 6,
  },
  remarkCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#F8FAFC",
    justifyContent: "space-between",
  },
  remarkLabel: {
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  remarkText: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Oblique",
    color: "#0F172A",
    minHeight: 18,
  },
  signeeName: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
    marginTop: 3,
    borderTopWidth: 0.5,
    borderTopColor: "#CBD5E1",
    paddingTop: 2,
  },
  signeeRole: {
    fontSize: 5.5,
    color: "#64748B",
  },
  sealCard: {
    width: "28%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    padding: 5,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
  sealTitle: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: "#059669",
    textAlign: "center",
  },
  sealAuth: {
    fontSize: 5.5,
    color: "#64748B",
    fontFamily: "Courier",
    marginTop: 1,
  },
  resumptionBadge: {
    marginTop: 3,
    backgroundColor: "#E2E8F0",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  resumptionText: {
    fontSize: 5.5,
    fontFamily: "Helvetica-Bold",
    color: "#0B1D3A",
    textAlign: "center",
  },
});


const GRADING_SCALE_ROWS = [
  { grade: "A*", range: "90% - 100%", remark: "Distinction" },
  { grade: "A", range: "80% - 89%", remark: "Excellent" },
  { grade: "B", range: "70% - 79%", remark: "Very Good" },
  { grade: "C", range: "60% - 69%", remark: "Good (Credit)" },
  { grade: "D", range: "50% - 59%", remark: "Fair / Pass" },
  { grade: "E", range: "40% - 49%", remark: "Weak Pass" },
  { grade: "F", range: "0% - 39%", remark: "Needs Support" },
];

const crestPath = path.join(
  process.cwd(),
  "public",
  "Greatminds-International-School-Crest.png",
);
const crestDataUrl = `data:image/png;base64,${fs.readFileSync(crestPath).toString("base64")}`;

export default function StudentReportPdfDocument({
  data,
}: {
  data: StudentReportPdfData;
}) {
  const { student, result } = data;
  const subjects = result.subjects ?? [];

  const caTotal = subjects.reduce((sum, s) => sum + (s.caScore ?? 0), 0);
  const examTotal = subjects.reduce((sum, s) => sum + (s.examScore ?? 0), 0);
  const aggregate = subjects.reduce((sum, s) => sum + (s.totalScore ?? 0), 0);
  const possible = subjects.length * 100;

  const average =
    result.overallAverage !== null && result.overallAverage !== undefined
      ? result.overallAverage
      : subjects.length > 0
        ? aggregate / subjects.length
        : 0;

  const gradeInfo = computeGrade(average);

  const termFormatted = `${result.term.name.charAt(0)}${result.term.name
    .slice(1)
    .toLowerCase()} Term`;

  const dateIssuedFormatted = result.reviewedAt
    ? new Date(result.reviewedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  // Calculate psychomotor filled stats
  const ratings = result.psychomotor ?? {};
  const psychomotorEntries = PSYCHOMOTOR_TRAITS.map((t) => ({
    key: t.key,
    label: t.label,
    wide: t.wide,
    rating:
      typeof ratings[t.key] === "number" ? (ratings[t.key] as number) : null,
  }));
  const earnedPsychomotor = psychomotorEntries.reduce(
    (sum, t) => sum + (t.rating ?? 0),
    0,
  );
  const maxPsychomotor = PSYCHOMOTOR_TRAITS.length * 5;
  const psychomotorPct =
    maxPsychomotor > 0
      ? Math.round((earnedPsychomotor / maxPsychomotor) * 100)
      : 0;

  return (
    <Document title={`${student.name} - ${termFormatted} Assessment Report`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Image
                src={crestDataUrl}
                style={{ width: 60, height: 60, objectFit: "contain" }}
              />
            </View>
            <View style={styles.schoolInfo}>
              <Text style={styles.schoolName}>
                GREATMINDS INTERNATIONAL SCHOOL
              </Text>
              <Text style={styles.schoolMotto}>“Teaching To Dominate”</Text>
              <Text style={styles.schoolAddress}>
                17, Olarenwaju Oladunjoye St., off Ilo-Awela Rd, Ota, Ogun
                State, Nigeria
              </Text>
              <Text style={styles.schoolContact}>
                Tel: +234 8028010867 / +234 802319338 | Web:
                www.greatmindsschool.edu.ng
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportBadge}>Terminal Report Sheet</Text>
            <Text style={styles.curriculumText}>
              Cambridge &amp; National Primary Curriculum
            </Text>
            <Text style={styles.dateIssued}>Issued: {dateIssuedFormatted}</Text>
          </View>
        </View>

        {/* Biodata Grid */}
        <View style={styles.biodataGrid}>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Pupil's Full Name</Text>
            <Text style={styles.biodataValue}>{student.name}</Text>
          </View>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Admission Number</Text>
            <Text style={styles.biodataValue}>{student.admissionNumber}</Text>
          </View>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Class / Arm</Text>
            <Text style={styles.biodataValue}>{result.schoolClass}</Text>
          </View>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Academic Session &amp; Term</Text>
            <Text style={styles.biodataValue}>
              {result.term.sessionName} • {termFormatted}
            </Text>
          </View>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Class Position</Text>
            <Text style={[styles.biodataValue, { color: "#D97706" }]}>
              {formatClassPosition(result.classPosition, result.classSize)}
            </Text>
          </View>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Class Size</Text>
            <Text style={styles.biodataValue}>
              {result.classSize ? `${result.classSize} Pupils` : "—"}
            </Text>
          </View>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Gender / Sex</Text>
            <Text style={styles.biodataValue}>{student.sex ?? "—"}</Text>
          </View>
          <View style={styles.biodataCell}>
            <Text style={styles.biodataLabel}>Report Status</Text>
            <Text style={[styles.biodataValue, { color: "#059669" }]}>
              Official &amp; Certified
            </Text>
          </View>
        </View>

        {/* KPI Summary Cards */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Overall Average</Text>
            <Text style={styles.kpiValue}>{average.toFixed(1)}%</Text>
            <Text style={styles.kpiSub}>
              {result.classAverage !== null && result.classAverage !== undefined
                ? `Class Avg: ${result.classAverage.toFixed(1)}%`
                : "Term Average"}
            </Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Total Aggregate</Text>
            <Text style={styles.kpiValue}>{aggregate}</Text>
            <Text style={styles.kpiSub}>Out of {possible} marks</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Academic Standing</Text>
            <Text style={[styles.kpiValue, { color: "#059669" }]}>
              {gradeInfo.grade}
            </Text>
            <Text style={styles.kpiSub}>{gradeInfo.label}</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Class Position</Text>
            <Text style={[styles.kpiValue, { color: "#D97706" }]}>
              {result.classPosition ? formatOrdinal(result.classPosition) : "—"}
            </Text>
            <Text style={styles.kpiSub}>
              {result.classSize ? `in class of ${result.classSize}` : "—"}
            </Text>
          </View>
        </View>

        {/* Subject Assessment Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.colNum}></Text>
            <Text style={styles.colSubject}>Subject Title</Text>
            <Text style={styles.colScore}>CA (40)</Text>
            <Text style={styles.colScore}>Exam (60)</Text>
            <Text style={styles.colTotal}>Total (100)</Text>
            <Text style={styles.colGrade}>Grade</Text>
            <Text style={styles.colRemark}>Remark</Text>
            <Text style={styles.colClassAvg}>Class Avg</Text>
            <Text style={styles.colPosition}>Position</Text>
          </View>

          {subjects.map((sub, idx) => {
            const isEven = idx % 2 === 1;
            const subGrade = sub.grade ?? computeGrade(sub.totalScore).grade;
            const subRemark = sub.remark ?? computeGrade(sub.totalScore).label;

            return (
              <View
                key={sub.id}
                style={[styles.tableRow, isEven ? styles.tableRowEven : {}]}
              >
                <Text style={styles.colNum}>{idx + 1}</Text>
                <Text style={styles.colSubject}>{sub.subjectName}</Text>
                <Text style={styles.colScore}>{sub.caScore}</Text>
                <Text style={styles.colScore}>{sub.examScore}</Text>
                <Text style={styles.colTotal}>{sub.totalScore}</Text>
                <Text style={styles.colGrade}>{subGrade}</Text>
                <Text style={styles.colRemark}>{subRemark}</Text>
                <Text style={styles.colClassAvg}>
                  {sub.classAverage !== null && sub.classAverage !== undefined
                    ? sub.classAverage.toFixed(1)
                    : "—"}
                </Text>
                <Text style={styles.colPosition}>
                  {sub.subjectPosition
                    ? formatOrdinal(sub.subjectPosition)
                    : "—"}
                </Text>
              </View>
            );
          })}

          {/* Table Summary Footer */}
          <View style={styles.tableFooter}>
            <Text style={styles.colNum}>∑</Text>
            <Text style={styles.colSubject}>
              Aggregate ({subjects.length} Subjects)
            </Text>
            <Text style={styles.colScore}>
              {caTotal}/{subjects.length * 40}
            </Text>
            <Text style={styles.colScore}>
              {examTotal}/{subjects.length * 60}
            </Text>
            <Text style={styles.colTotal}>
              {aggregate}/{possible}
            </Text>
            <Text style={styles.colGrade}>{gradeInfo.grade}</Text>
            <Text style={styles.colRemark}>{gradeInfo.label}</Text>
            <Text style={styles.colClassAvg}>
              {result.classAverage !== null && result.classAverage !== undefined
                ? `${result.classAverage.toFixed(1)}%`
                : "—"}
            </Text>
            <Text style={styles.colPosition}>
              {formatClassPosition(result.classPosition, result.classSize)}
            </Text>
          </View>
        </View>

        {/* Middle Container: Grading Scale & Affective/Psychomotor Skills */}
        <View style={styles.middleContainer}>
          {/* Grading Scale */}
          <View style={styles.gradingScaleBox}>
            <Text style={styles.sectionTitle}>Primary Grading Scale</Text>
            {GRADING_SCALE_ROWS.map((g) => (
              <View key={g.grade} style={styles.gradingRow}>
                <Text style={styles.gradingGrade}>{g.grade}</Text>
                <Text style={styles.gradingRange}>{g.range}</Text>
                <Text style={styles.gradingRemark}>{g.remark}</Text>
              </View>
            ))}
          </View>

          {/* Affective & Psychomotor Domain */}
          <View style={styles.psychomotorBox}>
            <Text style={styles.sectionTitle}>
              Affective &amp; Psychomotor Development (Scale: 1 - 5)
            </Text>
            <View style={styles.psychomotorGrid}>
              {psychomotorEntries.map((trait) => (
                <View
                  key={trait.key}
                  style={
                    trait.wide
                      ? styles.psychomotorItemFull
                      : styles.psychomotorItem
                  }
                >
                  <Text style={styles.psychomotorTraitName}>{trait.label}</Text>
                  <Text style={styles.psychomotorRating}>
                    {trait.rating ? `${trait.rating}/5` : "—"}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.psychomotorSummaryRow}>
              <Text>
                Developmental Score: {earnedPsychomotor} / {maxPsychomotor} (
                {psychomotorPct}%)
              </Text>
              <Text style={{ fontFamily: "Helvetica-Bold", color: "#059669" }}>
                Exemplary Conduct
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Section: Remarks & Official Sign-off */}
        <View style={styles.signoffContainer}>
          {/* Teacher Remark */}
          <View style={styles.remarkCard}>
            <View>
              <Text style={styles.remarkLabel}>Class Teacher's Assessment</Text>
              <Text style={styles.remarkText}>
                {result.teacherRemark?.trim()
                  ? `“${result.teacherRemark.trim()}”`
                  : "An active and diligent pupil who demonstrates commendable dedication to learning."}
              </Text>
            </View>
            <View>
              <Text style={styles.signeeName}>{result.teacherName}</Text>
              <Text style={styles.signeeRole}>
                Homeroom Lead • {result.schoolClass}
              </Text>
            </View>
          </View>

          {/* Headteacher Remark */}
          <View style={styles.remarkCard}>
            <View>
              <Text style={styles.remarkLabel}>Headteacher's Verdict</Text>
              <Text style={styles.remarkText}>
                {result.headTeacherRemark?.trim()
                  ? `“${result.headTeacherRemark.trim()}”`
                  : "Impressive academic performance and well-rounded character. Keep striving for greater heights!"}
              </Text>
            </View>
            <View>
              <Text style={styles.signeeName}>Dr. Mrs. A. O. Adeleke</Text>
              <Text style={styles.signeeRole}>Head of Primary School</Text>
            </View>
          </View>

          {/* Seal / Certification */}
          <View style={styles.sealCard}>
            <Text style={styles.sealTitle}>✓ Certified Official Record</Text>
            <Text style={styles.sealAuth}>
              AUTH: GMIS-PRI-{result.id.slice(-8).toUpperCase()}
            </Text>
            <View style={styles.resumptionBadge}>
              <Text style={styles.resumptionText}>Next Term Resumption:</Text>
              <Text style={[styles.resumptionText, { color: "#D97706" }]}>
                Monday, 13th January 2025
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
