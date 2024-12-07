const { predictHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: predictHandler,
        options: {
            payload: {
                maxBytes: 1000000,
                parse: true,
                output: 'data',
                allow: 'multipart/form-data',
            },
        },
    },
];

module.exports = routes;
