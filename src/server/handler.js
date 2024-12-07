const { predict } = require('../services/inferenceService');
const { storePrediction } = require('../services/storeData');
const { v4: uuidv4 } = require('uuid');

async function predictHandler(req, h) {
    const { image } = req.payload;

    if (!image || image.length > 1000000) {
        return h.response({
            status: 'fail',
            message: 'Payload content length greater than maximum allowed: 1000000',
        }).code(413);
    }

    try {
        const result = await predict(image);
        const id = uuidv4();
        const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';
        const createdAt = new Date().toISOString();

        const predictionData = { id, result, suggestion, createdAt };
        await storePrediction(predictionData);

        return {
            status: 'success',
            message: 'Model is predicted successfully',
            data: predictionData,
        };
    } catch (error) {
        return h.response({
            status: 'fail',
            message: 'An error occurred during prediction',
        }).code(500);
    }
}

module.exports = { predictHandler };
