import { useQuery } from "@tanstack/react-query";
import { TextContent } from "../types/techTypes";

const TEXT_URL = "https://rogermarco.github.io/tooltips-frontend/src/public/content.json";

export function useTextContent() {
  return useQuery<TextContent, Error>({
    queryKey: ["text-content"],
    queryFn: async () => {
      const res = await fetch(TEXT_URL);
      if (!res.ok) throw new Error("Failed to fetch text content");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}