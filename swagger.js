const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'MarketPlace Project API',
    description: 'This API contains information about people who sell all kind of products,and the general information of the products they sell.',
  },
  host: 'https://personal-project-qgjf.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./Routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });