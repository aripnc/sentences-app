import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  outDir: "dist",
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  minify: false,
  dts: false,
  clean: true,
});
