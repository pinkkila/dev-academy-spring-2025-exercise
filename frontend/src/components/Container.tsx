import { cn } from "@/lib/utils.ts";
import * as React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("flex flex-col max-w-7xl mx-auto min-h-screen py-8 px-6 gap-5", className)}>
      {children}
    </div>
  );
}
