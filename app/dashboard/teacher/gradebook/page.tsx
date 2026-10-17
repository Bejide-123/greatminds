import { redirect } from "next/navigation";

export default function LegacyGradebookPage() {
  redirect("/dashboard/gradebook");
}