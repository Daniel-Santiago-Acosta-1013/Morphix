import { XCircle } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <XCircle aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

