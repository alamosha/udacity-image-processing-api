import express from 'express';
import { cachedImageDir } from './includes/pathes';
import { resizeImage, validateValues } from './includes/functions';
import fs from 'fs';

const app = express();

// Create a static public images directory to be accessable through browser.
app.use(express.static(cachedImageDir));

app.get('/image', (req, res) => {
  const imageDetails = {
    name: req.query.name as string,
    width: parseInt(req.query.width as string),
    height: parseInt(req.query.height as string),
  };
  // Validator
  const { error } = validateValues(req.query as unknown as string);
  if (error) {
    return res.status(400).send(`<h1>Error: ${error.details[0].message}</h1>`);
  }
  if (
    fs.existsSync(
      `${cachedImageDir}/${imageDetails.name}_${imageDetails.width}_${imageDetails.height}.jpg`
    )
  ) {
    console.log('Picture already found, serving through cached image.');
    res.send(
      `<img src="${imageDetails.name}_${imageDetails.width}_${imageDetails.height}.jpg">`);
  } else {
    resizeImage(imageDetails.width, imageDetails.height, imageDetails.name)
      .then((resp) => {
        console.log('Picture not found, Image resized.');
        res.send(`<img src="${resp}">`);
      })
      .catch((err) => {
        res.status(404).send(`<h1>Error</h1><h2>${err.message}</h2>`);
        console.log(err);
      });
  }
});

// to catch main page
app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1>Welcome to Image Processing API</h1><h2>Please append "/image?name=[Image Name]&height=[Image Height]&width=[Image Width]" to proceed.</h2>'
    );
});

const port = 3000;
app.listen(port, () => {
  console.log(`System is now up and running on port ${port}`);
});

export default app;
