// src/components/ui.jsx
import React from "react";

export const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`flex items-start justify-between gap-4 p-5 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-bold leading-tight ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 pt-0 ${className}`}>{children}</div>
);

export const Button = ({
  children,
  className = "",
  onClick,
  variant = "default",
  type = "button",
  as: As = "button",
  to,
  href,
}) => {
  const base =
    "inline-flex items-center justify-center text-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition active:scale-[.98]";
  const styles = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 hover:border-gray-400",
    soft: "bg-gray-100 hover:bg-gray-200",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
    red: "bg-rose-600 text-white hover:bg-rose-700",
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  return (
    <As to={to} href={href} onClick={onClick} type={type} className={cls}>
      {children}
    </As>
  );
};

export const ProgressBar = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-gray-100">
    <div
      className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);
