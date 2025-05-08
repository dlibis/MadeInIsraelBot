import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({
  className = "",
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "he" : "en";
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors ${className}`}
    >
      {language === "en" ? "עברית" : "English"}
    </button>
  );
}
