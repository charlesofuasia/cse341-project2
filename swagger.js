//const { type } = require('./utilities/patientValidator');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'cse341-project2-yijv.onrender.com',
  schemes: ['http', 'https'],
  securityDefinitions: {
    github_oauth: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      flow: 'implicit',
      client_id: process.env.GITHUB_CLIENT_ID,
      scopes: {
        'read:user': 'Read user information',
        repo: 'Access repositories',
      },
    },
  },
  security: [
    {
      github_oauth: ['read:user'],
    },
  ],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
