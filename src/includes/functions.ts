import sharp from 'sharp';
import joi from 'joi';
import { cachedImageDir, originalImageDir } from './pathes';

async function resizeImage(
  width: number,
  height: number,
  image: string
): Promise<string> {
  await sharp(`${originalImageDir}/${image}.jpg`)
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toFile(`${cachedImageDir}/${image}_${width}_${height}.jpg`);
  return `${image}_${width}_${height}.jpg`;
}

function validateValues(value: string) {
  const schema = joi.object({
    width: joi.number().required(),
    height: joi.number().required(),
    name: joi.string().required(),
  });

  const options = {
    errors: {
      wrap: {
        label: "'",
      },
    },
  };

  return schema.validate(value, options);
}

export { resizeImage, validateValues };
