const router = require('express').Router();
const userRoutes = require('./api/userRoute');
const thoughtsRoute = require('./api/thoughtsRoute');

router.use('/api', userRoutes);
router.use('/api', thoughtsRoute);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;