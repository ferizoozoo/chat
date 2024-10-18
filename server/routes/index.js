import express from 'express';
var router = express.Router();

/**
 * Index route that says hello!
 *
 * @route GET /
 * @returns {Object} 200 - Say hello!
 */
router.get('/', function(req, res, next) {
  res.send("hello")
});

export default router;
