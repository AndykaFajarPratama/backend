const tf = require('@tensorflow/tfjs-node');
const { loadModel } = require('./loadModel');

async function predict(imageBuffer) {
    const model = await loadModel();
    const tensor = tf.node.decodeImage(imageBuffer)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
    const prediction = model.predict(tensor).dataSync();
    return prediction[0] > 0.5 ? 'Cancer' : 'Non-cancer';
}

module.exports = { predict };
