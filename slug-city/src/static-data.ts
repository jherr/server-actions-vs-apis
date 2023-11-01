export const SLUGS = [
  { slug: "biking-slug", name: "Biking Slug" },
  { slug: "coder-slug", name: "Coder Slug" },
  { slug: "cook-slug", name: "Chef Slug" },
  { slug: "cricket-slug", name: "Cricket Slug" },
  { slug: "f1-slug", name: "F1 Slug" },
  { slug: "puppy-slug", name: "Puppy Slug" },
  { slug: "rocker-slug", name: "Rcoker Slug" },
  { slug: "running-slug", name: "Running Slug" },
  { slug: "spaceman-slug", name: "Spaceman Slug" },
  { slug: "tophat-slug", name: "Fancy Slug" },
  { slug: "yoda-slug", name: "Yoda Slug" },
].toSorted((a, b) => a.name.localeCompare(b.name));
