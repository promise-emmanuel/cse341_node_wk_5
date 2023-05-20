const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My MarketPlace Project API',
    description: 'This API contains information about people who sell all kind of products,and the general information of the products they sell.',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./Routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });