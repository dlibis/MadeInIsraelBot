import { /* useEffect, */ useState } from "react"; // useEffect might not be needed if variable counts are simplified
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler, useWatch } from "react-hook-form"; // Added useWatch
import type { Template, TemplateCategory, TemplateComponent } from "../types";
import { apiService } from "../services/apiService";

// Import sub-components
import TemplateDetailsForm from "../components/CreateTemplatePage/TemplateDetailsForm";
// import TabNavigation from "../components/CreateTemplatePage/TabNavigation"; // Old tab navigation, replaced
import TemplateComponentsList from "../components/CreateTemplatePage/TemplateComponentsList";
import FormActions from "../components/CreateTemplatePage/FormActions";
import TabsRadix from "../components/ui/TabsRadix"; // Import the new Radix Tabs component

// FormValues interface is now primarily used by sub-components but exported for them
export interface FormValues {
  templateName: string;
  description: string;
  category: TemplateCategory;
  language: string;
  status: string;
  components: TemplateComponent[];
}

const CreateTemplatePage = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      templateName: "",
      description: "",
      category: "MARKETING",
      language: "en",
      status: "draft",
      components: [
        {
          type: "BODY",
          text: "Hello {{name}}, thank you for your interest in our products!",
          format: "TEXT",
          example: { header_text: ["Default example"] },
        },
      ],
    },
  });

  const currentLanguageDir = i18n.language === "he" ? "rtl" : "ltr"; // Determine direction

  // Watch components to calculate variable count for the tab label
  const components = useWatch({ control, name: "components" });
  const variableCount = Array.isArray(components)
    ? components.reduce(
        (acc, curr) => acc + (curr.text?.match(/\{\{.*?\}\}/g)?.length || 0),
        0
      )
    : 0;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const templateData: Omit<Template, "id" | "createdAt"> = {
        name: data.templateName,
        category: data.category,
        language: data.language,
        components: data.components,
        status: "pending",
      };

      await apiService.createTemplate(templateData);
      setSuccessMessage(
        t("createTemplate.successSubmit", "Template submitted successfully!")
      );
      reset();
    } catch (error) {
      setErrorMessage(
        t(
          "createTemplate.failSubmit",
          "Failed to submit template. Please try again."
        )
      );
      console.error(error);
    }
  };

  const tabs = [
    {
      value: "components",
      label: t("createTemplate.components"),
      content: (
        <TemplateComponentsList
          control={control}
          register={register}
          errors={errors}
        />
      ),
    },
    {
      value: "variables",
      label: `${t("createTemplate.variables")} (${variableCount})`,
      content: (
        <div className="p-4 text-center bg-gray-50 rounded-lg">
          <p>
            {t(
              "createTemplate.variablesPlaceholder",
              "Variable management will be implemented in a future update."
            )}
          </p>
        </div>
      ),
    },
    {
      value: "buttons",
      label: `${t("createTemplate.buttons")} (0)`, // Placeholder count for buttons
      content: (
        <div className="p-4 text-center bg-gray-50 rounded-lg">
          <p>
            {t(
              "createTemplate.buttonsPlaceholder",
              "Button management will be implemented in a future update."
            )}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-2">{t("createTemplate.title")}</h1>
      <p className="text-gray-600 mb-8">{t("createTemplate.subtitle")}</p>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm mb-8 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="p-6 border-b border-gray-200">
            <TemplateDetailsForm
              control={control}
              register={register}
              errors={errors}
            />
          </div>

          {/* Replace old tab navigation with Radix Tabs */}
          <TabsRadix
            tabs={tabs}
            defaultValue="components"
            contentClassName="pt-6 px-0 pb-0"
            dir={currentLanguageDir}
          />

          <FormActions isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
