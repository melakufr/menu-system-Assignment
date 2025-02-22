"use client";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {  
  return (
    <>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
    </>
  );
}
export default Providers;
