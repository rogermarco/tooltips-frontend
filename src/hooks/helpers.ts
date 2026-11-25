import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type {
  CivStrings,
  MasterTechTree,
  Profiles,
  TextContent,
  UniqueStrings,
} from '../types/techTypes';

// Override with VITE_DATA_URL (e.g. `npm run dev:local` serves the worker's local data).
const CLOUDFLARE_URL: string =
  import.meta.env.VITE_DATA_URL ?? 'https://rogermarco.work/data/';

// Worker route returning the two civs currently being played on a stream.
const CIVS_URL = 'https://rogermarco.work/civs/';

const ONE_HOUR = 1000 * 60 * 60;

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export function useTechstrings() {
  return useQuery({
    queryKey: ['content'],
    queryFn: () => fetchJson<TextContent>(CLOUDFLARE_URL + 'techstrings.json'),
    staleTime: ONE_HOUR,
  });
}

export function useCivstrings() {
  return useQuery({
    queryKey: ['civstrings'],
    queryFn: () => fetchJson<CivStrings>(CLOUDFLARE_URL + 'civstrings.json'),
    staleTime: ONE_HOUR,
  });
}

export function useProfiles() {
  return useSuspenseQuery({
    queryKey: ['profiles'],
    queryFn: () => fetchJson<Profiles>(CLOUDFLARE_URL + 'profiles.json'),
    staleTime: ONE_HOUR,
  });
}

export function useUniquestrings() {
  return useSuspenseQuery({
    queryKey: ['uniquestrings'],
    queryFn: () => fetchJson<UniqueStrings>(CLOUDFLARE_URL + 'uniquestrings.json'),
    staleTime: ONE_HOUR,
  });
}

async function fetchStreamCivs(stream: string): Promise<string[] | null> {
  const res = await fetch(CIVS_URL + encodeURIComponent(stream));
  // The worker returns 404 when it has no game data for this stream
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? (data as string[]) : null;
}

/**
 * The civs being played on `stream`, polled every 2 minutes while the
 * streamer is playing AoE2. `null` when the worker has no data for the
 * stream; other failed requests keep the last good result.
 */
export function useStreamCivs(stream: string, enabled: boolean) {
  return useQuery({
    queryKey: ['civs', stream],
    queryFn: () => fetchStreamCivs(stream),
    enabled: enabled && !!stream,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 4, // 4 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 2, // 2 minutes
    refetchIntervalInBackground: true,
  });
}

// Prefetch all data //
export const fetchAll = async () => {
  const [civStrings, uniqueStrings, techTree] = await Promise.all([
    fetchJson<CivStrings>(CLOUDFLARE_URL + 'civstrings.json'),
    fetchJson<UniqueStrings>(CLOUDFLARE_URL + 'uniquestrings.json'),
    fetchJson<MasterTechTree>(CLOUDFLARE_URL + 'techtree.json'),
  ]);
  return { civStrings, uniqueStrings, techTree };
};
export function useAllTechtreeData() {
  return useQuery({
    queryKey: ['techtree-data'],
    queryFn: fetchAll,
    staleTime: ONE_HOUR,
  });
}
// End prefetch all data //

export const prettifyText = (text: string) => {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
