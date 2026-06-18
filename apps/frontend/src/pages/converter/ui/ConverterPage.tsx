import { ConversionOverview } from '../../../widgets/conversion-overview';
import { ConversionWorkspace } from '../../../widgets/conversion-workspace';
import { JobsHistoryWidget } from '../../../widgets/jobs-history';

export function ConverterPage() {
  return (
    <main className="app-shell">
      <section className="workspace">
        <ConversionOverview />
        <ConversionWorkspace />
      </section>
      <JobsHistoryWidget />
    </main>
  );
}

