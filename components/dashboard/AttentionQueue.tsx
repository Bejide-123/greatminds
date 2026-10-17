import { Baby } from "lucide-react";
import { ATTENTION_ITEMS } from "@/lib/teacher-data";

export default function AttentionQueue() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Baby className="text-secondary w-[22px] h-[22px]" />
            <h3 className="font-title-md text-title-md text-on-surface">
              Primary Attention Queue &amp; Child Support Items (Basic 4
              Diamond)
            </h3>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Flagged pupil action items requiring Mrs. Danladi&apos;s attention
            before final term sign-off.
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-space-sm py-1 rounded font-mono">
            TERM 1 AUDIT: BASIC-4
          </span>
        </div>
      </div>

      <div className="overflow-x-auto mt-space-sm">
        <table className="w-full text-left font-tabular-data text-body-sm min-w-[900px]">
          <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase">
            <tr>
              <th className="py-space-sm px-space-md">Pupil ID</th>
              <th className="py-space-sm px-space-md">Pupil Full Name</th>
              <th className="py-space-sm px-space-md">Learning Area / Subject</th>
              <th className="py-space-sm px-space-md">Flagged Record / Status</th>
              <th className="py-space-sm px-space-md">Teacher Attention Note</th>
              <th className="py-space-sm px-space-md text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {ATTENTION_ITEMS.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-surface-container-low/50 transition-colors"
              >
                <td className="py-space-sm px-space-md font-mono text-primary font-bold">
                  {item.id}
                </td>
                <td className="py-space-sm px-space-md font-title-md text-on-surface">
                  {item.name}
                </td>
                <td className="py-space-sm px-space-md">{item.area}</td>
                <td className="py-space-sm px-space-md">
                  <span
                    className={`${item.statusColor} px-space-xs py-0.5 rounded font-mono`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-space-sm px-space-md text-on-surface-variant">
                  {item.note}
                </td>
                <td className="py-space-sm px-space-md text-right">
                  <button
                    type="button"
                    className="px-space-sm py-1 bg-surface-container text-primary hover:bg-primary hover:text-on-primary rounded font-label-md text-label-sm transition-colors"
                  >
                    {item.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}