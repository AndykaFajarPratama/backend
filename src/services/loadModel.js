const tf = require('@tensorflow/tfjs-node');

/**
 * Caches the loaded model to avoid reloading it multiple times.
 */
let model;

/**
 * Loads the TensorFlow.js model from the specified URL.
 * The URL is retrieved from the environment variables.
 */
async function loadModel() {
    if (!model) {
        console.log('Loading model from:', process.env.MODEL_URL);
        model = await tf.loadLayersModel(process.env.MODEL_URL);
        console.log('Model loaded successfully.');
    }
    return model;
}

module.exports = { loadModel };
