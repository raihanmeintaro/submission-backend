const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData')
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { confidenceScore, result, suggestion } = await predictClassification(model, image);

    console.log('Prediction Result:', result, 'Suggestion:', suggestion);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        id,
        result,
        suggestion,
        createdAt,
    };

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201);
    return response;

}

module.exports = postPredictHandler;