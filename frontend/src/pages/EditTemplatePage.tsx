import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Template, TemplateCategory, TemplateComponent } from "../types";
import { apiService } from "../services/apiService";

const EditTemplatePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "components" | "variables" | "buttons"
  >("components");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form state
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TemplateCategory>("MARKETING");
  const [language, setLanguage] = useState("en");
  const [status, setStatus] = useState<
    "pending" | "ready" | "approved" | "rejected"
  >("pending");

  // Template components
  const [components, setComponents] = useState<TemplateComponent[]>([]);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) {
        setErrorMessage("Template ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const template = await apiService.getTemplateById(id);

        if (!template) {
          setErrorMessage("Template not found");
          setIsLoading(false);
          return;
        }

        // Populate form with template data
        setTemplateName(template.name);
        setCategory(template.category);
        setLanguage(template.language);
        setStatus(template.status || "pending");
        setComponents(template.components);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching template:", error);
        setErrorMessage("Failed to load template");
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      setErrorMessage("Template ID is missing");
      return;
    }

    if (!templateName.trim() || components.length === 0) {
      setErrorMessage("Template name and at least one component are required");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const templateData: Partial<Template> = {
        name: templateName,
        category,
        language,
        components,
        status,
      };

      await apiService.updateTemplate(id, templateData);

      setSuccessMessage("Template updated successfully!");

      // Navigate back to templates list after short delay
      setTimeout(() => {
        navigate("/templates");
      }, 1500);
    } catch (error) {
      setErrorMessage("Failed to update template. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mr-3"></div>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  if (errorMessage === "Template not found") {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center w-full">
        <p className="text-lg font-medium mb-2">
          {t("editTemplate.templateNotFound")}
        </p>
        <button
          onClick={() => navigate("/templates")}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          {t("common.cancel")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-2">{t("editTemplate.title")}</h1>
      <p className="text-gray-600 mb-8">{t("editTemplate.subtitle")}</p>

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
        <form onSubmit={handleSubmit} className="w-full">
          <div className="p-6 border-b border-gray-200">
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
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("createTemplate.category")}
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as TemplateCategory)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="MARKETING">
                      {t("categories.marketing")}
                    </option>
                    <option value="UTILITY">{t("categories.utility")}</option>
                    <option value="AUTHENTICATION">
                      {t("categories.authentication")}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("createTemplate.language")}
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="en">English</option>
                    <option value="he">Hebrew</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("createTemplate.status")}
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as
                          | "pending"
                          | "ready"
                          | "approved"
                          | "rejected"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="pending">{t("statuses.pending")}</option>
                    <option value="ready">{t("statuses.ready")}</option>
                    <option value="approved">{t("statuses.approved")}</option>
                    <option value="rejected">{t("statuses.rejected")}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <div className="px-2">
              <nav className="flex">
                <button
                  type="button"
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === "components"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("components")}
                >
                  {t("createTemplate.components")}
                </button>
                <button
                  type="button"
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === "variables"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("variables")}
                >
                  {t("createTemplate.variables")}
                </button>
                <button
                  type="button"
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === "buttons"
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("buttons")}
                >
                  {t("createTemplate.buttons")}
                </button>
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "components" && (
              <div>
                {components.map((component, index) => (
                  <div key={index} className="mb-8 relative">
                    <div className="absolute top-0 right-0">
                      {components.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newComponents = [...components];
                            newComponents.splice(index, 1);
                            setComponents(newComponents);
                          }}
                          className="text-red-500 hover:text-red-700"
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
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("createTemplate.componentType")}
                        </label>
                        <select
                          value={component.type}
                          onChange={(e) => {
                            const newComponents = [...components];
                            newComponents[index] = {
                              ...newComponents[index],
                              type: e.target.value as
                                | "HEADER"
                                | "BODY"
                                | "FOOTER"
                                | "BUTTONS",
                            };
                            setComponents(newComponents);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="BODY">Body</option>
                          <option value="HEADER">Header</option>
                          <option value="FOOTER">Footer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("createTemplate.format")}
                        </label>
                        <select
                          value={component.format || "TEXT"}
                          onChange={(e) => {
                            const newComponents = [...components];
                            newComponents[index] = {
                              ...newComponents[index],
                              format: e.target.value as
                                | "TEXT"
                                | "IMAGE"
                                | "VIDEO"
                                | "DOCUMENT"
                                | "LOCATION",
                            };
                            setComponents(newComponents);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="TEXT">Text</option>
                          <option value="IMAGE">Image</option>
                          <option value="VIDEO">Video</option>
                          <option value="DOCUMENT">Document</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("createTemplate.bodyContent")}
                      </label>
                      <textarea
                        value={component.text || ""}
                        onChange={(e) => {
                          const newComponents = [...components];
                          newComponents[index] = {
                            ...newComponents[index],
                            text: e.target.value,
                          };
                          setComponents(newComponents);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        rows={5}
                      ></textarea>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("createTemplate.tip")} {`{{variable_name}}`}{" "}
                        {t("createTemplate.toAddVariables")}
                      </p>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setComponents([
                      ...components,
                      {
                        type: "BODY",
                        text: "",
                        format: "TEXT",
                      },
                    ]);
                  }}
                  className="px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  + Add Component
                </button>
              </div>
            )}

            {activeTab === "variables" && (
              <div className="p-4 text-center bg-gray-50 rounded-lg">
                <p>
                  Variable management will be implemented in a future update.
                </p>
              </div>
            )}

            {activeTab === "buttons" && (
              <div className="p-4 text-center bg-gray-50 rounded-lg">
                <p>Button management will be implemented in a future update.</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/templates")}
              className="px-5 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : t("editTemplate.saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTemplatePage;
