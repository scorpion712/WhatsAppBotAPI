const express = require('express');
const router = express.Router();
const { validateUser, isReady, sendMessageHandler } = require('../controllers/whatsappController');

router.get('/validate', validateUser);
router.get('/isReady', isReady);
router.post('/sendMessage', sendMessageHandler);

module.exports = router;
