import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function ActionButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: ActionButtonProps) {
  const classes = ["action-button", variant === "primary" ? "" : variant, className].filter(Boolean).join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
