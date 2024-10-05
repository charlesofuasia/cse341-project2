const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.send('Personal Project API');
});
router.use('/patients', require('./patientsRoute'));

router.use('/employees', require('./employeesRoute'));

module.exports = router;
