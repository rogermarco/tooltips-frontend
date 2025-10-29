const icons = import.meta.glob("./assets/techtree/*.webp", {
  eager: true,
  import: "default",
});

// Convert keys => cleaner names (remove path + .webp extension)
export const iconMap = Object.fromEntries(
  Object.entries(icons).map(([path, module]) => {
    const name = path.split("/").pop().replace(".webp", "");
    return [name, module];
  })
);