'use client';

import { Toaster } from '@/components/ui/sonner';
import { AlertDialogProvider } from '@/providers/alert-dialog-provider';
import { ThemeProvider } from '@/providers/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <Toaster />
      <AlertDialogProvider />
      {children}
    </ThemeProvider>
  );
}
