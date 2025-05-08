import { /* useState, */ useEffect } from "react"; // useState might not be needed anymore
// import { Link } from "react-router-dom"; // Link is used in subcomponents
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { /* apiService, */ fetcher } from "../services/apiService"; // apiService might not be needed directly
import type { Template } from "../types";

// Import sub-components with corrected casing
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentTemplatesSection from "../components/dashboard/RecentTemplatesSection";

const DashboardPage = () => {
  const { t } = useTranslation(); // t might only be needed for error message now

  const {
    data: templates,
    error: fetchError,
    isLoading,
  } = useSWR<Template[]>("getTemplates", fetcher);

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
        <p>{t("dashboard.errorLoad", "Failed to load dashboard data")}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <DashboardHeader />
      <DashboardStats templates={templates || []} />
      <RecentTemplatesSection templates={templates || []} />
    </div>
  );
};

export default DashboardPage;
