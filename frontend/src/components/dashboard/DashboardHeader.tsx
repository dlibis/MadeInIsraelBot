import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DashboardHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("dashboard.title")}</h1>
        <p className="text-gray-600">{t("dashboard.subtitle")}</p>
      </div>
      <Link
        to="/create"
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
      >
        <span className="mr-1">+</span>
        {t("common.createTemplate")}
      </Link>
    </div>
  );
}
