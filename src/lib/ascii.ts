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
  return trim(lines).join('\n');
}

// Drops the blank rows and columns around the drawing (the icon's dark body), so the art's box is
// the drawing itself and lines up with whatever sits next to it.
function trim(lines: string[]): string[] {
  const first = lines.findIndex((line) => line !== '');
  const last = lines.findLastIndex((line) => line !== '');
  if (first === -1) return [];
  const rows = lines.slice(first, last + 1);
  const indent = Math.min(...rows.filter((line) => line !== '').map((line) => line.search(/\S/)));
  return rows.map((line) => line.slice(indent));
}
