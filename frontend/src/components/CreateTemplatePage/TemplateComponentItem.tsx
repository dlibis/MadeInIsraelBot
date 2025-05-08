import { useTranslation } from "react-i18next";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
  type UseFieldArrayRemove,
} from "react-hook-form";
import { type FormValues } from "../../pages/CreateTemplatePage"; // Corrected path and import type

interface TemplateComponentItemProps {
  index: number;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<FormValues>;
  totalFields: number;
  componentData: FormValues["components"][number];
}

export default function TemplateComponentItem({
  index,
  control,
  register,
  remove,
  errors,
  totalFields,
  componentData,
}: TemplateComponentItemProps) {
  const { t } = useTranslation();

  const getExampleDefaultValue = () => {
    if (typeof componentData.example === "object") {
      return JSON.stringify(componentData.example);
    }
    return componentData.example || "";
  };

  return (
    <div className="mb-8 relative">
      {totalFields > 1 && (
        <div className="absolute top-0 right-0">
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("createTemplate.componentType")}
          </label>
          <Controller
            name={`components.${index}.type` as const}
            control={control}
            defaultValue={componentData.type}
            render={({ field: controllerField }) => (
              <select
                {...controllerField}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="BODY">Body</option>
                <option value="HEADER">Header</option>
                <option value="FOOTER">Footer</option>
              </select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("createTemplate.format")}
          </label>
          <Controller
            name={`components.${index}.format` as const}
            control={control}
            defaultValue={componentData.format}
            render={({ field: controllerField }) => (
              <select
                {...controllerField}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="TEXT">Text</option>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="DOCUMENT">Document</option>
              </select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("createTemplate.example")}
          </label>
          <input
            type="text"
            {...register(`components.${index}.example` as const)}
            defaultValue={getExampleDefaultValue()}
            placeholder="Example data for WhatsApp approval"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("createTemplate.bodyContent")}
        </label>
        <textarea
          {...register(`components.${index}.text` as const, {
            required: t(
              "validation.componentTextRequired",
              "Component text cannot be empty"
            ),
          })}
          defaultValue={componentData.text || ""}
          className={`w-full px-3 py-2 border ${
            errors.components?.[index]?.text
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md focus:ring-purple-500 focus:border-purple-500`}
          rows={5}
          placeholder="Hello {{name}}, thank you for your interest in our products!"
        ></textarea>
        {errors.components?.[index]?.text && (
          <p className="text-red-500 text-xs mt-1">
            {errors.components?.[index]?.text?.message}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {t("createTemplate.tip")} {`{{variable_name}}`}{" "}
          {t("createTemplate.toAddVariables")}
        </p>
      </div>
    </div>
  );
}
