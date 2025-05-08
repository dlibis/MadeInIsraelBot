import type { Template } from "../types";
import { v4 as uuidv4 } from "uuid";

// Mock storage using localStorage
const STORAGE_KEY = "whatsapp_templates";

// Helper to get templates from localStorage
const getStoredTemplates = (): Template[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// Helper to save templates to localStorage
const saveTemplates = (templates: Template[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
};

// Mock API functions with delays to simulate network requests
export const apiService = {
  getTemplates: async (): Promise<Template[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getStoredTemplates();
  },

  getTemplateById: async (id: string): Promise<Template | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const templates = getStoredTemplates();
    return templates.find((t) => t.id === id) || null;
  },

  createTemplate: async (
    templateData: Omit<Template, "id" | "createdAt" | "status">
  ): Promise<Template> => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const newTemplate: Template = {
      ...templateData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    const templates = getStoredTemplates();
    templates.push(newTemplate);
    saveTemplates(templates);

    return newTemplate;
  },

  updateTemplate: async (
    id: string,
    templateData: Partial<Template>
  ): Promise<Template | null> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const templates = getStoredTemplates();
    const index = templates.findIndex((t) => t.id === id);

    if (index === -1) return null;

    templates[index] = {
      ...templates[index],
      ...templateData,
    };

    saveTemplates(templates);
    return templates[index];
  },

  deleteTemplate: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const templates = getStoredTemplates();
    const filteredTemplates = templates.filter((t) => t.id !== id);

    if (filteredTemplates.length === templates.length) {
      return false;
    }

    saveTemplates(filteredTemplates);
    return true;
  },
};

// Generic fetcher for SWR
// Key can be a string (like 'getTemplates') or an array (like ['getTemplateById', templateId])
export const fetcher = async (
  key: string | [string, ...any[]]
): Promise<any> => {
  let methodName: string;
  let args: any[] = [];

  if (Array.isArray(key)) {
    [methodName, ...args] = key;
  } else {
    methodName = key;
  }

  const method = (apiService as any)[methodName];

  if (typeof method === "function") {
    return method(...args);
  } else {
    throw new Error(`API method "${methodName}" not found`);
  }
};
