import { useTranslation } from "react-i18next";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { type FormValues } from "../../pages/CreateTemplatePage"; // Adjust path as needed

interface TemplateDetailsFormProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export default function TemplateDetailsForm({
  control,
  register,
  errors,
}: TemplateDetailsFormProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label
          htmlFor="templateName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("createTemplate.templateName")}
        </label>
        <input
          type="text"
          id="templateName"
          {...register("templateName", {
            required: t("validation.required", "This field is required"),
          })}
          className={`w-full px-3 py-2 border ${
            errors.templateName ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring-purple-500 focus:border-purple-500`}
          placeholder="Weekly Newsletter"
        />
        {errors.templateName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.templateName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t("createTemplate.description")}
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          rows={3}
          placeholder="Describe the purpose of this template"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("createTemplate.category")}
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="MARKETING">{t("categories.marketing")}</option>
                <option value="UTILITY">{t("categories.utility")}</option>
                <option value="AUTHENTICATION">
                  {t("categories.authentication")}
                </option>
              </select>
            )}
          />
        </div>

        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("createTemplate.language")}
          </label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="language"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="en">English</option>
                <option value="he">Hebrew</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="ar">Arabic</option>
              </select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
