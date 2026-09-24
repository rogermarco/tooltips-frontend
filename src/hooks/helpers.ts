import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { TextContent } from '../types/techTypes';
// import techstrings from '../lib/localjson/techstrings.json';
// import civstrings from '../lib/localjson/civstrings.json';
// import profiles from '../lib/localjson/profiles.json';
// import uniquestrings from '../lib/localjson/uniquestrings.json';
// import techtree from '../lib/localjson/techtree.json';

const CLOUDFLARE_URL = 'https://rogermarco.work/data/';

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json();
}

export function useTechstrings() {
  return useQuery<TextContent, Error>({
    queryKey: ['content'],
    queryFn: () => fetchJson<TextContent>(CLOUDFLARE_URL + 'techstrings.json'),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useCivstrings() {
  return useQuery({
    queryKey: ['civstrings'],
    queryFn: () => fetchJson(CLOUDFLARE_URL + 'civstrings.json'),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useProfiles() {
  return useSuspenseQuery({
    queryKey: ['profiles'],
    queryFn: () => fetchJson(CLOUDFLARE_URL + 'profiles.json'),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useUniquestrings() {
  return useSuspenseQuery({
    queryKey: ['uniquestrings'],
    queryFn: () => fetchJson(CLOUDFLARE_URL + 'uniquestrings.json'),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useTechtree() {
  return useSuspenseQuery({
    queryKey: ['techtree'],
    queryFn: () => fetchJson(CLOUDFLARE_URL + 'techtree.json'),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// Prefetch all data //
export const fetchAll = async () => {
  const [civStrings, uniqueStrings, techTree] = await Promise.all([
    fetchJson(CLOUDFLARE_URL + 'civstrings.json'),
    fetchJson(CLOUDFLARE_URL + 'uniquestrings.json'),
    fetchJson(CLOUDFLARE_URL + 'techtree.json'),
  ]);
  return { civStrings, uniqueStrings, techTree };
};
export function useAllTechtreeData() {
  return useQuery({
    queryKey: ['techtree-data'],
    queryFn: fetchAll,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
// End prefetch all data //

export const prettifyText = (text: string) => {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
