// Build-time helper: the natural pixel size of a file in public/, so an
// <img> can carry width/height and reserve its space before it loads. Used
// for the gallery and merch photos, which are not fixed-ratio boxes. Runs
// only during `astro build` / `astro dev`; never ships to the browser.
import path from "node:path";
import sharp from "sharp";

export interface ImageSize {
  width?: number;
  height?: number;
}

export async function publicImageSize(publicPath: string): Promise<ImageSize> {
  try {
    // Resolved from the project root: Astro bundles this module into a
    // temporary location at build time, so a path relative to the source
    // file would point at nothing.
    const file = path.join(process.cwd(), "public", publicPath);
    const { width, height } = await sharp(file).metadata();
    return { width, height };
  } catch {
    // A missing file still renders (the browser shows a broken image, which
    // is the right signal); it just does not get its space reserved.
    return {};
  }
}
