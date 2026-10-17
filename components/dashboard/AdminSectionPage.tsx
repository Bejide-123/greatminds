import type { ReactNode } from "react";
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function AdminSectionPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="relative min-h-screen bg-background px-gutter-lg pb-space-2xl pt-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-space-lg pt-space-xl">
            <header>
              <h1 className="font-headline-lg text-headline-lg font-bold text-primary">
                {title}
              </h1>
              <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
            </header>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
