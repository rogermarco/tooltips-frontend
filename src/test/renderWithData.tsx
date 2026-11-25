import { Suspense, type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Renders `ui` with react-query already holding `data` (query key -> value),
 * so components read it without any network requests.
 */
export function renderWithData(ui: ReactElement, data: Record<string, unknown> = {}) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  for (const [key, value] of Object.entries(data)) {
    client.setQueryData(JSON.parse(key) as unknown[], value);
  }
  return render(
    <QueryClientProvider client={client}>
      <Suspense fallback='loading'>{ui}</Suspense>
    </QueryClientProvider>,
  );
}

/** Query keys used by the hooks in src/hooks/helpers.ts */
export const keys = {
  techstrings: JSON.stringify(['content']),
  uniquestrings: JSON.stringify(['uniquestrings']),
  civstrings: JSON.stringify(['civstrings']),
  profiles: JSON.stringify(['profiles']),
  civs: (stream: string) => JSON.stringify(['civs', stream]),
};
