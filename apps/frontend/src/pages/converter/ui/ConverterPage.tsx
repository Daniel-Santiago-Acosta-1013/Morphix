import { ConversionOverview } from '../../../widgets/conversion-overview';
import { ConversionWorkspace } from '../../../widgets/conversion-workspace';
import { AppFooter, AppHeader } from '../../../widgets/app-shell';
import { JobsHistoryWidget } from '../../../widgets/jobs-history';

export function ConverterPage() {
  return (
    <div id="top" className="min-h-screen">
      <AppHeader />
      <main className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:py-8">
        <section className="grid items-stretch gap-5 lg:grid-cols-[minmax(280px,0.88fr)_minmax(360px,1.42fr)]">
          <ConversionOverview />
          <ConversionWorkspace />
        </section>
        <JobsHistoryWidget />
      </main>
      <AppFooter />
    </div>
  );
}
