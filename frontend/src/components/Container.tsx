import type { ReactNode } from "react";

export default function Container({ children }: {children: ReactNode}) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen py-8 px-6">
      {children}
    </div>
  );
}
