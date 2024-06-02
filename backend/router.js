const express = require("express");
const router = express.Router();
const friendController = require('./controller/friend');
const debtController = require('./controller/debt');

router.post('/friend/add', friendController.add);
router.post('/friend/list', friendController.list);
router.post('/friend/get', friendController.get);
router.post('/friend/update', friendController.update);
router.post('/friend/delete', friendController.delete);
router.post('/friend/delete', friendController.delete);
router.post('/debt/create', debtController.create);

module.exports = router;