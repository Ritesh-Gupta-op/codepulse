import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-radial-grid text-white">
      <div className="mx-auto flex min-h-screen max-w-[1800px] gap-6 p-4 lg:p-6">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col gap-6">
          <Topbar />
          {children}
        </main>
      </div>
    </div>
  );
}
