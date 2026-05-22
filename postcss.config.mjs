const plugins = {};

try {
  await import("@tailwindcss/postcss");
  plugins["@tailwindcss/postcss"] = {};
} catch {
  // Tailwind is optional for the Vite portal page in src/main.jsx.
}

const config = {
  plugins,
};

export default config;
