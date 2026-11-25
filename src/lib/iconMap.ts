const icons = import.meta.glob<string>('../assets/techtree/*.webp', {
  eager: true,
  import: 'default',
});

/** Tech tree icon URLs keyed by file name without extension, e.g. "knight". */
export const iconMap: Record<string, string> = Object.fromEntries(
  Object.entries(icons).map(([path, url]) => [
    path.split('/').pop()!.replace('.webp', ''),
    url,
  ]),
);
