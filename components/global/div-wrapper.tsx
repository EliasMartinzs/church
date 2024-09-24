import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface DivWrapper extends React.HTMLAttributes<HTMLDivElement> {}

export const DivWrapper = forwardRef<HTMLDivElement, DivWrapper>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn("max-w-[90vw] lg:max-w-[90vw] mx-auto mt-5 space-y-6")}
      >
        {children}
      </div>
    );
  }
);

DivWrapper.displayName = "DivWrapper";
