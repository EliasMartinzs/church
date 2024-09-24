import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface SectionWrapper extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapper>(
  ({ children, className, ...props }, ref) => (
    <section
      ref={ref}
      {...props}
      className={cn(className, "max-w-[90%] lg:max-w-4xl mx-auto")}
    >
      {children}
    </section>
  )
);

SectionWrapper.displayName = "SectionWrapper";
