import express from 'express';
import User from '../models/user.js';
var router = express.Router();

/* GET home page. */
router.post('/', async function(req, res, next) {
    const user = new User({
        ip: req.ip.toString(),
        username: req.body.username
    });
    await user.save()
    res.send(user);
});

router.get('/', async function(req, res, next) {
    const users = await User.find({ ip: req.ip.toString() });
    res.send(users)
});

export default router;
