import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { TextContent } from "../types/techTypes";

const TEXT_URL = "https://rogermarco.github.io/tooltips-frontend/src/public/";
const CLOUDFLARE_URL = "https://tooltips-worker.marcrogers90.workers.dev/data/"

export function useTechstrings() {
  return useQuery<TextContent, Error>({
    queryKey: ["content"],
    queryFn: async () => {
      const res = await fetch(CLOUDFLARE_URL + "techstrings.json");
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useCivstrings() {
  return useQuery({
    queryKey: ["civstrings"],
    queryFn: async () => {
      const res = await fetch(CLOUDFLARE_URL + "civstrings.json");
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useProfiles() {
  return useSuspenseQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const res = await fetch(CLOUDFLARE_URL + "profiles.json");
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useUniquestrings() {
  return useSuspenseQuery({
    queryKey: ["uniquestrings"],
    queryFn: async () => {
      const res = await fetch(CLOUDFLARE_URL + "uniquestrings.json");
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useTechtree() {
  return useSuspenseQuery({
    queryKey: ["techtree"],
    queryFn: async () => {
      const res = await fetch(CLOUDFLARE_URL + "techtree.json");
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
// Prefetch all data //
export const fetchAll = async () => {
  const [civStrings, uniqueStrings, techTree] = await Promise.all([
    fetch(CLOUDFLARE_URL + "civstrings.json").then((r) => r.json()),
    fetch(CLOUDFLARE_URL + "uniquestrings.json").then((r) => r.json()),
    fetch(CLOUDFLARE_URL + "techtree.json").then((r) => r.json()),
  ]);
  return { civStrings, uniqueStrings, techTree };
};
export function useAllTechtreeData() {
  return useQuery({
    queryKey: ["techtree-data"],
    queryFn: fetchAll,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
// End prefetch all data //

export const prettifyText = (text: string) => {
  return text.split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
}