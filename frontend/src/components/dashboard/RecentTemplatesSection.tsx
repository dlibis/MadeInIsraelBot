import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import type { Template } from "../../types"; // Adjust path if needed

interface RecentTemplatesSectionProps {
  templates: Template[];
}

export default function RecentTemplatesSection({
  templates,
}: RecentTemplatesSectionProps) {
  const { t } = useTranslation();

  const recentTemplates = useMemo(() => {
    if (!templates || templates.length === 0) {
      return [];
    }
    // Sort by createdAt date in descending order (newest first)
    return [...templates]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5); // Display up to 5 recent templates
  }, [templates]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {t("dashboard.recentTemplates")}
        </h2>
        <Link
          to="/templates"
          className="text-purple-600 hover:text-purple-800 flex items-center"
        >
          {t("dashboard.viewAll")}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {recentTemplates && recentTemplates.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <ul className="divide-y divide-gray-200">
            {recentTemplates.map((template) => (
              <li
                key={template.id}
                className="px-6 py-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {template.name}
                  </p>
                  {/* Consider translating category/language if needed */}
                  <p className="text-sm text-gray-500">
                    {template.category} - {template.language}
                  </p>
                </div>
                <Link
                  to={`/edit/${template.id}`}
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  {t("common.edit")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="text-gray-400 p-6 rounded-full bg-gray-50">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">
            {t("dashboard.noTemplates")}
          </h3>
          <p className="text-gray-500 mb-6">
            {t("dashboard.createFirstTemplate")}
          </p>
          <Link
            to="/create"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            <span className="mr-1">+</span>
            {t("common.createTemplate")}
          </Link>
        </div>
      )}
    </div>
  );
}
