import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSWR, { useSWRConfig } from "swr";
import { apiService, fetcher } from "../services/apiService";
import type { Template } from "../types";
import { Badge, badgeVariants } from "../components/ui/Badge";
import type { VariantProps } from "class-variance-authority";

const TemplatesPage = () => {
  const { t } = useTranslation();
  const { mutate } = useSWRConfig();

  const {
    data: templates,
    error: fetchError,
    isLoading,
  } = useSWR<Template[]>("getTemplates", fetcher);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteTemplate = async (id: string) => {
    setDeleteError(null);
    if (
      window.confirm(
        t(
          "templates.confirmDelete",
          "Are you sure you want to delete this template?"
        )
      )
    ) {
      try {
        await apiService.deleteTemplate(id);

        mutate(
          "getTemplates",
          (currentData: Template[] | undefined) =>
            currentData?.filter((template) => template.id !== id) || [],
          { revalidate: false }
        );
      } catch (err) {
        console.error("Error deleting template:", err);
        setDeleteError(
          t(
            "templates.errorDelete",
            "Failed to delete template. Please try again."
          )
        );
        mutate("getTemplates");
      }
    }
  };

  const getStatusTranslation = (status: string | undefined) => {
    switch (status) {
      case "approved":
        return t("statuses.approved");
      case "pending":
        return t("statuses.pending");
      case "rejected":
        return t("statuses.rejected");
      case "ready":
        return t("statuses.ready");
      default:
        return status || t("statuses.unknown", "Unknown");
    }
  };

  type StatusVariantMap = {
    [key: string]: VariantProps<typeof badgeVariants>["variant"];
  };
  const statusVariantMap: StatusVariantMap = {
    approved: "approved",
    pending: "pending",
    rejected: "rejected",
    ready: "ready",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center">
        <p>
          {t(
            "templates.errorLoad",
            "Failed to load templates. Please try again."
          )}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{t("templates.title")}</h1>
        <Link
          to="/create"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <span className="mr-1">+</span>
          {t("common.createTemplate")}
        </Link>
      </div>

      {deleteError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {deleteError}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t("common.search")}
              className="py-2 pl-10 pr-4 block w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {!templates || templates.length === 0 ? (
          <div className="p-10 text-center">
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
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("templates.name")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("templates.category")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("templates.language")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("templates.status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("templates.created")}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("templates.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {template.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {t(
                          `categories.${template.category.toLowerCase()}`,
                          template.category.replace(/_/g, " ").toLowerCase()
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {template.language.replace("_", "-")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          statusVariantMap[template.status || ""] || "default"
                        }
                      >
                        {getStatusTranslation(template.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(template.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/edit/${template.id}`}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        {t("common.edit")}
                      </Link>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        {t("common.duplicate")}
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        {t("common.delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
