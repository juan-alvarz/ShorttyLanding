import sharp from 'sharp';

// Turns an image into ASCII art at build time: each character stands for a small block
// of pixels, picked by how bright that block is.
const RAMP = ' .:-=+*#%@';
// Blocks darker than this count as background and become spaces.
const FLOOR = 0.3;

export async function toAscii(path: string, columns: number, rows: number): Promise<string> {
  const { data, info } = await sharp(path)
    .resize({ width: columns, height: rows, fit: 'fill' })
    .flatten({ background: '#000' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lines: string[] = [];
  for (let y = 0; y < info.height; y++) {
    let line = '';
    for (let x = 0; x < info.width; x++) {
      const brightness = Math.max(0, (data[y * info.width + x] / 255 - FLOOR) / (1 - FLOOR));
      line += RAMP[Math.min(RAMP.length - 1, Math.floor(brightness * RAMP.length))];
    }
    lines.push(line.trimEnd());
  }
  return lines.join('\n');
}
