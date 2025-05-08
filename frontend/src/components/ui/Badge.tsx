import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils"; // Assuming you have a cn utility, otherwise import clsx and tailwind-merge

const badgeVariants = cva(
  // Base styles for all badges
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Define variants based on status
        default: "border-transparent bg-gray-100 text-gray-800",
        approved: "border-transparent bg-green-100 text-green-800",
        pending: "border-transparent bg-yellow-100 text-yellow-800",
        rejected: "border-transparent bg-red-100 text-red-800",
        ready: "border-transparent bg-blue-100 text-blue-800",
        // You could add other variants here if needed, e.g., primary, secondary
        // primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  // If you don't have a cn utility, replace with:
  // import clsx from 'clsx';
  // import { twMerge } from 'tailwind-merge';
  // const classes = twMerge(clsx(badgeVariants({ variant }), className));
  const classes = cn(badgeVariants({ variant }), className);

  return <div className={classes} {...props} />;
}

export { Badge, badgeVariants };
