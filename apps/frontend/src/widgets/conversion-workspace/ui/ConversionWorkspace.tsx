import { useRef } from 'react';
import { UploadCloud, XCircle } from 'lucide-react';
import { acceptedExtensions, ConversionRouteSummary } from '../../../entities/conversion';
import { JobStatusBadge } from '../../../entities/job';
import { ConvertButton, ConversionProgress, useConvertFile } from '../../../features/convert-file';
import { DownloadJobButton } from '../../../features/download-job-result';
import { TargetFormatGrid, useTargetFormat } from '../../../features/select-target-format';
import { env } from '../../../shared/config/env';
import { formatBytes } from '../../../shared/lib/formatBytes';
import { cn } from '../../../shared/lib/utils';
import { Alert, AlertDescription } from '../../../shared/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/card';
import { Input } from '../../../shared/ui/input';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '../../../shared/ui/item';
import { Label } from '../../../shared/ui/label';

export function ConversionWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);
  const conversion = useConvertFile();
  const target = useTargetFormat(conversion.sourceFormat);
  const acceptedFormatsLabel = acceptedExtensions().replaceAll('.', '').toUpperCase().split(',').join(' · ');

  return (
    <section id="converter" aria-label="Conversor de archivos" className="scroll-mt-24">
      <Card className="h-full min-h-[620px] border-border/70 bg-card/88 shadow-2xl shadow-black/25 backdrop-blur sm:min-h-[560px]">
        <CardHeader className="border-b border-border/45 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-normal text-muted-foreground uppercase">Nueva conversión</span>
            <CardTitle className="text-2xl font-semibold tracking-normal sm:text-3xl">Carga tu archivo</CardTitle>
            <CardDescription>Selecciona el formato final y sigue el avance desde esta vista.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid gap-5">
          <Label
            htmlFor="conversion-file"
            className={cn(
              'group grid min-h-52 cursor-pointer place-items-center gap-3 rounded-lg border border-dashed border-border/80 bg-background/35 p-8 text-center transition-colors hover:border-primary/70 hover:bg-primary/5',
              conversion.file && 'border-primary/70 bg-primary/10',
            )}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              conversion.selectFile(event.dataTransfer.files.item(0));
            }}
          >
            <Input
              id="conversion-file"
              ref={inputRef}
              className="sr-only"
              type="file"
              accept={acceptedExtensions()}
              onChange={(event) => conversion.selectFile(event.currentTarget.files?.item(0) ?? null)}
            />
            <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25">
              <UploadCloud className="size-6" aria-hidden="true" />
            </span>
            <span className="max-w-full overflow-hidden text-lg font-semibold text-ellipsis text-foreground">
              {conversion.file ? conversion.file.name : 'Arrastra un archivo o explora tu equipo'}
            </span>
            <span className="max-w-full text-sm text-muted-foreground">
              {conversion.file ? `${formatBytes(conversion.file.size)} · ${conversion.sourceFormat.toUpperCase()}` : acceptedFormatsLabel}
            </span>
          </Label>

          {conversion.fileTooLarge && (
            <Alert variant="destructive">
              <XCircle className="size-4" aria-hidden="true" />
              <AlertDescription>El archivo supera el límite configurado de {env.maxFileSizeMb} MB.</AlertDescription>
            </Alert>
          )}
          {conversion.file && target.targetOptions.length === 0 && (
            <Alert variant="destructive">
              <XCircle className="size-4" aria-hidden="true" />
              <AlertDescription>El formato {conversion.sourceFormat.toUpperCase()} no está disponible por ahora.</AlertDescription>
            </Alert>
          )}

          <TargetFormatGrid options={target.targetOptions} targetFormat={target.targetFormat} onSelect={target.setTargetFormat} />

          <ConvertButton
            flowState={conversion.flowState}
            disabled={!conversion.canStart || !target.targetFormat}
            onClick={() => void conversion.convert(target.targetFormat)}
          />

          <ConversionProgress currentJob={conversion.currentJob} flowState={conversion.flowState} />

          {target.selectedPair && <ConversionRouteSummary pair={target.selectedPair} />}

          {conversion.currentJob && (
            <Item variant="muted" className="border-border/60 bg-background/45">
              <ItemContent className="min-w-0">
                <ItemTitle>
                  <JobStatusBadge status={conversion.currentJob.status} />
                  {conversion.currentJob.source_format.toUpperCase()} a {conversion.currentJob.target_format.toUpperCase()}
                </ItemTitle>
                <ItemDescription className="truncate">Creada {new Date(conversion.currentJob.created_at).toLocaleString()}</ItemDescription>
              </ItemContent>
              <ItemActions>
                {conversion.currentJob.status === 'COMPLETED' && <DownloadJobButton job={conversion.currentJob} onError={conversion.setError} />}
              </ItemActions>
            </Item>
          )}

          {conversion.error && (
            <Alert variant="destructive">
              <XCircle className="size-4" aria-hidden="true" />
              <AlertDescription>{conversion.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
