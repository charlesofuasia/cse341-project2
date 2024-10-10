const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

//router.get('/', (req, res) => {
//  res.send('Personal Project API');
//});
router.use('/patients', require('./patientsRoute'));

router.use('/employees', require('./employeesRoute'));

router.get('/login', passport.authenticate('github'));

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.send('You are logged out.');
  });
});

module.exports = router;
