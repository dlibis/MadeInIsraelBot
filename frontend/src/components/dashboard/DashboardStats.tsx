import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import type { Template } from "../../types";

interface TemplateStats {
  total: number;
  draft: number;
  ready: number;
  approved: number;
}

interface DashboardStatsProps {
  templates: Template[];
}

export default function DashboardStats({ templates }: DashboardStatsProps) {
  const { t } = useTranslation();

  const stats: TemplateStats = useMemo(() => {
    if (!templates) {
      return { total: 0, draft: 0, ready: 0, approved: 0 };
    }
    return {
      total: templates.length,
      draft: templates.filter((t) => t.status === "pending").length,
      ready: templates.filter((t) => t.status === "ready").length,
      approved: templates.filter((t) => t.status === "approved").length,
    };
  }, [templates]);

  const statCards = [
    {
      label: t("dashboard.totalTemplates"),
      value: stats.total,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      iconPath:
        "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    },
    {
      label: t("dashboard.draft"),
      value: stats.draft,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      label: t("dashboard.ready"),
      value: stats.ready,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      iconPath:
        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      label: t("dashboard.approved"),
      value: stats.approved,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <div className={`${card.iconBg} p-3 rounded-lg`}>
              <svg
                className={`w-6 h-6 ${card.iconColor}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={card.iconPath}
                />
              </svg>
            </div>
          </div>
          <div className="text-gray-500 text-sm font-medium">{card.label}</div>
          <div className="text-3xl font-bold">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
