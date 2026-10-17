import type { ReactNode } from "react";
import TeacherHeader from "@/components/dashboard/TeacherHeader";
import TeacherSidebar from "@/components/dashboard/TeacherSidebar";

type TeacherSectionPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function TeacherSectionPage({
  title,
  description,
  children,
}: TeacherSectionPageProps) {
  return (
    <>
      <TeacherSidebar />
      <div className="pl-64">
        <TeacherHeader />
        <main className="relative min-h-screen bg-background px-gutter-lg pb-space-2xl pt-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-space-lg pt-space-xl">
            <header>
              <h1 className="font-headline-lg text-headline-lg font-bold text-primary">
                {title}
              </h1>
              <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                {description}
              </p>
            </header>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
