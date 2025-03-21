import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
  type?: string;
  iconFront?: React.ReactNode;
  iconBack?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconFront, iconBack, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row items-center gap-3 rounded-xl bg-cream px-4 py-3",
          className,
        )}
      >
        {iconFront}
        <input
          type={type}
          className="flex h-9 w-full rounded-md bg-transparent font-prompt outline-none ring-0 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-dark-gray placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          ref={ref}
          {...props}
        />
        {iconBack}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
