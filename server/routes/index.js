import express from 'express';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send("hello")
});

export default router;
