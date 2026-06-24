import { FileArchive, ShieldCheck } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileArchive className="size-5" aria-hidden="true" />
          </span>
          <span className="grid min-w-0">
            <span className="truncate text-base font-semibold leading-none text-foreground">Morphix</span>
            <span className="truncate text-xs text-muted-foreground">Conversor profesional de archivos</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          <Button variant="ghost" size="sm" asChild>
            <a href="#converter">Convertir</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#history">Historial</a>
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="outline" className="hidden border-primary/35 bg-primary/10 text-primary sm:inline-flex">
            <ShieldCheck className="size-3" aria-hidden="true" />
            Activo
          </Badge>
          <Button size="sm" asChild>
            <a href="#converter">Nuevo archivo</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
