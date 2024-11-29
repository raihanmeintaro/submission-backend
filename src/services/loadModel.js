const tf = require('@tensorflow/tfjs-node');
const MODEL_URL = 'https://storage.googleapis.com/submission-bucket-raihan/model-submission/model.json'


async function loadModel() {
    return tf.loadGraphModel(MODEL_URL);
}
module.exports = loadModel;