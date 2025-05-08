import { useTranslation } from "react-i18next";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFieldArray, // Keep as non-type import for usage
  // type UseFieldArrayAppend, // Not directly used as type, append is a function from useFieldArray
  // type UseFieldArrayRemove, // Not directly used as type, remove is a function from useFieldArray
} from "react-hook-form";
import { type FormValues } from "../../pages/CreateTemplatePage";
import type { TemplateComponent } from "../../types"; // Import TemplateComponent
import TemplateComponentItem from "./TemplateComponentItem";

interface TemplateComponentsListProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export default function TemplateComponentsList({
  control,
  register,
  errors,
}: TemplateComponentsListProps) {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray<
    FormValues,
    "components",
    "id"
  >({
    control,
    name: "components",
  });

  const handleAddComponent = () => {
    const newComponent: TemplateComponent = {
      // Use TemplateComponent type
      type: "BODY",
      text: "",
      format: "TEXT",
      example: { header_text: [""] }, // Ensure example is a valid object structure or string. For object, provide minimal valid structure.
    };
    append(newComponent);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <TemplateComponentItem
          key={field.id}
          index={index}
          control={control}
          register={register}
          remove={remove}
          errors={errors}
          totalFields={fields.length}
          componentData={field}
        />
      ))}
      <button
        type="button"
        onClick={handleAddComponent}
        className="px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
      >
        + {t("createTemplate.addComponent", "Add Component")}
      </button>
    </div>
  );
}
