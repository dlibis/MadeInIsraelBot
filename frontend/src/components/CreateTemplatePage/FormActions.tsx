import { useTranslation } from "react-i18next";

interface FormActionsProps {
  isSubmitting: boolean;
}

export default function FormActions({ isSubmitting }: FormActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-5 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
      >
        {isSubmitting
          ? t("common.saving", "Saving...")
          : t("createTemplate.saveTemplate")}
      </button>
    </div>
  );
}
