const express = require('express');
const router = express.Router();
const aboutMeController = require('../controllers/aboutMeController');

router.get('/about-me', aboutMeController.getAboutMeList);
router.get('/about-me-with-key', aboutMeController.getAboutMeData);
router.post('/about-me', aboutMeController.createAboutMe);
router.put('/about-me/:id', aboutMeController.updateAboutMe);
router.delete('/about-me/:id', aboutMeController.deleteAboutMe);

module.exports = router;