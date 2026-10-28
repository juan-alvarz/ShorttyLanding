import sharp from 'sharp';

// Ordered (Bayer 8×8) dithering at build time: the image becomes two flat colors,
// with the pattern of dots carrying the shading. The image is inverted first, so a dark
// app UI turns into mostly paper with its bright details in ink. Returns a PNG data URI.
const BAYER = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

type RGB = [number, number, number];

export async function dither(path: string | Buffer, width: number, ink: RGB, paper: RGB): Promise<string> {
  const { data, info } = await sharp(path)
    .resize({ width })
    .flatten({ background: '#000' })
    .greyscale()
    .normalise()
    .negate({ alpha: false })
    .linear(1.15, 0)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(info.width * info.height * 3);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = y * info.width + x;
      const threshold = (BAYER[y % 8][x % 8] + 0.5) / 64;
      out.set(data[i] / 255 > threshold ? paper : ink, i * 3);
    }
  }

  const png = await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
    .png({ palette: true, colors: 2, compressionLevel: 9 })
    .toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
}
