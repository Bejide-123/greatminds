import {
  Users,
  BadgeCheck,
  DoorOpen,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type AdminMetricsProps = {
  summary: {
    activeStudents: number;
    activeTeachers: number;
    classes: number;
    pendingResults: number;
    approvedResults: number;
  };
};

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  badge: BadgeCheck,
  meeting_room: DoorOpen,
  verified: ShieldCheck,
};

export default function AdminMetrics({ summary }: AdminMetricsProps) {
  const metrics = [
    {
      label: "Active Students",
      value: summary.activeStudents.toLocaleString(),
      sub: "Enrolled students",
      icon: "users",
    },
    {
      label: "Active Teachers",
      value: summary.activeTeachers.toLocaleString(),
      sub: "Staff with active profiles",
      icon: "badge",
    },
    {
      label: "Classes",
      value: summary.classes.toLocaleString(),
      sub: "School classes configured",
      icon: "meeting_room",
    },
    {
      label: "Results Awaiting Review",
      value: summary.pendingResults.toLocaleString(),
      sub: `${summary.approvedResults.toLocaleString()} approved`,
      icon: "verified",
      isProgress: true,
      progressValue:
        summary.pendingResults + summary.approvedResults === 0
          ? 0
          : (summary.approvedResults /
              (summary.pendingResults + summary.approvedResults)) *
            100,
      valueColor: "text-secondary-container",
      iconBg: "bg-secondary-fixed text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {metrics.map((m) => {
        const Icon = ICON_MAP[m.icon];
        const isProgress = "isProgress" in m && m.isProgress;
        return (
          <div
            key={m.label}
            className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                {m.label}
              </span>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  "iconBg" in m && m.iconBg ? m.iconBg : "bg-surface-container text-primary"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-space-md">
              {isProgress ? (
                <>
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`font-headline-xl text-headline-xl font-bold ${"valueColor" in m && m.valueColor ? m.valueColor : "text-primary"}`}
                    >
                      {m.value}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                      {m.sub}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-secondary-container h-full rounded-full"
                      style={{ width: `${"progressValue" in m ? m.progressValue : 0}%` }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="font-headline-xl text-headline-xl text-primary font-bold">
                    {m.value}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {m.sub}
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}