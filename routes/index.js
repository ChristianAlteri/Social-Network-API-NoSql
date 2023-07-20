const router = require('express').Router();
const userRoutes = require('./api/userRoute');

router.use('/api', userRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;