const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const recognizeImage = require('../modules/vr');

const handleRequest = (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    let fileName;
    form.multiples = false;
    form.uploadDir = path.join(__dirname, '../temp');

    form.on('file', (field, file) => {
      const time = new Date().getTime();
      const extension = file.name.split('.')[1];
      fileName = `${time}.${extension}`;
      fs.rename(file.path, path.join(form.uploadDir, fileName), (err) => {
        if (err) {
          console.log(`Error while renaming file: ${file.path} - ${err}`); // eslint-disable-line
        }
      });
    });

    form.on('error', (err) => {
      console.log(`Error: ${err}`); //eslint-disable-line
      res.status(500);
      res.json({ error: 'internal_server_error' });
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', async () => {
      const result = await recognizeImage(fileName);
      if (typeof result === 'number') {
        res.status(result);
        res.json({ error: result });
        return;
      }
      res.json(result);
    });

    // parse the incoming request containing the form data
    form.parse(req);
  } catch (error) {
    console.log(error); //eslint-disable-line
    res.status(500);
    res.json({ error: 'internal_server_error' });
  }
};

module.exports = handleRequest;
