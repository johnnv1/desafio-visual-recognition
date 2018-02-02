const config = require('../config');
const watson = require('watson-developer-cloud');
const fs = require('fs');

const visualRecognition = watson.visual_recognition({
  api_key: config.vrApiKey,
  version: 'v3',
  version_date: '2016-05-20',
});

const waitUntilFileExists = fileName =>
  new Promise((resolve) => {
    const interval = setInterval(() => {
      if (fs.existsSync(fileName)) {
        resolve(true);
        clearInterval(interval);
        return false;
      }
      return true;
    }, 200);
  });


const classify = async (imageName) => {
  try {
    const imagePath = `${__dirname}/../temp/${imageName}`;

    await waitUntilFileExists(imagePath);

    const params = {
      images_file: fs.createReadStream(imagePath),
      classifier_ids: [config.vrClassifierId],
    };

    return new Promise((resolve) => {
      visualRecognition.classify(params, (err, res) => {
        if (err) {
          console.log(err); // eslint-disable-line
          resolve(500);
        } else {
          const classifier = res.images[0].classifiers[0];

          if (!classifier) {
            resolve(404);
            return;
          }

          const classes = classifier.classes[0];
          const imageData = { imagePath: `/temp/${imageName}` };
          resolve({ ...classes, ...imageData });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};


module.exports = classify;
