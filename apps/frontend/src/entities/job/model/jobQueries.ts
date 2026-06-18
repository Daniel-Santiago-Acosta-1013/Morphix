export const jobQueries = {
  all: ['jobs'] as const,
  list: () => [...jobQueries.all, 'list'] as const,
  detail: (jobId: string) => [...jobQueries.all, 'detail', jobId] as const,
};

