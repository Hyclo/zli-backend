const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title: 'Libraray API',
      description: 'API for a library',
   },
   host: 'localhost:4200',
   schemes: ['http'],
};

const outputFile = './public/files/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
