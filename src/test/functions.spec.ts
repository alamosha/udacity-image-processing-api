import fs from 'fs';
import { cachedImageDir } from '../includes/pathes';
import { resizeImage, validateValues } from '../includes/functions';

describe('Testing Functions', () => {
  it('Check resizing image to 100*100', async () => {
    if (fs.existsSync(`${cachedImageDir}/encenadaport_100_100.jpg`)) {
      fs.unlinkSync(`${cachedImageDir}/encenadaport_100_100.jpg`);
    }
    const resized = await resizeImage(100, 100, 'encenadaport');
    expect(resized).toBe('encenadaport_100_100.jpg');
  });

  // it('Check loading from cached image', async () => {
  //   const resized = await resizeImage(100, 100, 'encenadaport');
  //   expect(resized).toBe('encenadaport_100_100.jpg');
  //   fs.unlinkSync(`${cachedImageDir}/encenadaport_100_100.jpg`);
  // });

  it('Expect validator to return an error with "name" variable missing', async () => {
    const values = {
      width: 100,
      height: 100,
    };
    const validate = await validateValues(values as unknown as string);
    expect(validate.error).toBeDefined();
  });
});
