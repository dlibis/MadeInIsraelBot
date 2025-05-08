import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";
import React from "react";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="w-full px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-purple-600 text-2xl mr-2">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </span>
          </div>
          <Link to="/" className="font-bold text-xl">
            WhatsApp Template Creator
          </Link>
        </div>
        <nav className="flex space-x-6">
          <NavLink to="/">{t("common.dashboard")}</NavLink>
          <NavLink to="/templates">{t("common.templates")}</NavLink>
          <NavLink to="/create">{t("common.createNew")}</NavLink>
        </nav>
        <LanguageSwitcher className="ml-4" />
      </div>
    </header>
  );
}
