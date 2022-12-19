import supertest from 'supertest';
import app from '../index';
import { cachedImageDir } from '../includes/pathes';
import fs from 'fs';

const req = supertest(app);

describe('Testing API Endpoints', () => {
  it('Testing /image Endpoint (must return 400 as there is no params)', async () => {
    const res = await req.get('/image');
    expect(res.status).toBe(400);
  });
  it('Resizing encenadaport.jpg through /image endpoint', async () => {
    const res = await req.get('/image?name=encenadaport&width=100&height=100');
    if (fs.existsSync(`${cachedImageDir}/encenadaport_100_100.jpg`)) {
      fs.unlinkSync(`${cachedImageDir}/encenadaport_100_100.jpg`);
    }
    expect(res.status).toBe(200);
  });
});
