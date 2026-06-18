import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  label: string;
}

export function EmptyState({ icon, label }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon}
      <span>{label}</span>
    </div>
  );
}

