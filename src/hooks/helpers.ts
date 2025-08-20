import { useQuery } from "@tanstack/react-query";
import { TextContent } from "../types/techTypes";

const TEXT_URL = "https://rogermarco.github.io/tooltips-frontend/src/public/";

export function useTechstrings() {
  return useQuery<TextContent, Error>({
    queryKey: ["content"],
    queryFn: async () => {
      const res = await fetch(TEXT_URL + "techstrings.json");
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
      const res = await fetch(TEXT_URL + "civstrings.json");
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const res = await fetch(TEXT_URL + "profiles.json");
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}