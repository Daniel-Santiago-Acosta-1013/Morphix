import { FileArchive, FileText, ImageIcon, Music2 } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/shared/ui/item';

const metrics = [
  { value: '15', label: 'conversiones disponibles' },
  { value: '100 MB', label: 'por archivo' },
  { value: '3', label: 'familias de formatos' },
  { value: '1 clic', label: 'descarga del resultado' },
];

const formatGroups = [
  { title: 'Documentos', description: 'PDF, Word, Excel y presentaciones', icon: FileText },
  { title: 'Imágenes', description: 'JPG, PNG y WebP para publicar', icon: ImageIcon },
  { title: 'Audio y video', description: 'MP3, WAV, MP4 y WebM esenciales', icon: Music2 },
];

export function ConversionOverview() {
  return (
    <aside aria-label="Morphix overview">
      <Card className="h-full min-h-[620px] border-border/70 bg-card/88 shadow-2xl shadow-black/25 backdrop-blur sm:min-h-[560px]">
        <CardHeader className="gap-5 border-b border-border/45 pb-5">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileArchive className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0 space-y-3">
              <Badge variant="outline" className="border-primary/35 bg-primary/10 text-primary">
                Morphix
              </Badge>
              <CardTitle className="max-w-[12ch] text-4xl leading-none font-semibold tracking-normal text-balance sm:text-5xl">
                Convierte archivos sin fricción
              </CardTitle>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Documentos, imágenes y medios listos para entregar, compartir o publicar.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid flex-1 content-between gap-7">
          <ItemGroup className="grid grid-cols-2 gap-3" aria-label="Supported conversion coverage">
            {metrics.map((metric) => (
              <Item key={metric.label} variant="muted" className="min-h-24 flex-col items-start justify-center border-border/50 bg-muted/45">
                <ItemContent>
                  <ItemTitle className="text-2xl leading-none font-semibold text-foreground">{metric.value}</ItemTitle>
                  <ItemDescription>{metric.label}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>

          <ItemGroup className="gap-2" aria-label="Supported format families">
            {formatGroups.map(({ title, description, icon: Icon }) => (
              <Item key={title} variant="default" size="sm" className="border-border/45 bg-background/30">
                <ItemMedia variant="icon" className="size-9 rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="size-4" aria-hidden="true" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{title}</ItemTitle>
                  <ItemDescription>{description}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>
    </aside>
  );
}
