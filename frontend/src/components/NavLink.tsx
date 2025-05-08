import { Link, useLocation } from "react-router-dom";
import React from "react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ to, children, className }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 font-medium ${
        isActive ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
      } ${className || ""}`}
    >
      {children}
    </Link>
  );
}
