"use client";

import { createContext, useContext, type ReactNode } from "react";
import type {
  StudentResultRecord,
  StudentResultsPayload,
} from "@/lib/student-results";

type StudentResultContextValue = {
  data: StudentResultsPayload;
  selectedResult: StudentResultRecord | null;
  onSelectResult: (resultId: string) => void;
};

const StudentResultContext = createContext<StudentResultContextValue | null>(
  null
);

export function StudentResultProvider({
  value,
  children,
}: {
  value: StudentResultContextValue;
  children: ReactNode;
}) {
  return (
    <StudentResultContext.Provider value={value}>
      {children}
    </StudentResultContext.Provider>
  );
}

export function useStudentResult() {
  const context = useContext(StudentResultContext);
  if (!context) {
    throw new Error("useStudentResult must be used inside StudentResultProvider.");
  }
  return context;
}
