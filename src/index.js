const icons = import.meta.glob("./assets/techtree/*.png", {
  eager: true,
  import: "default",
});

// Convert keys => cleaner names (remove path + .png extension)
export const iconMap = Object.fromEntries(
  Object.entries(icons).map(([path, module]) => {
    const name = path.split("/").pop().replace(".png", "");
    return [name, module];
  })
);