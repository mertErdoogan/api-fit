const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

router.get('/banners', bannerController.getBannerList);
router.get('/banners-with-key', bannerController.getBannerData);
router.post('/banners', bannerController.createBanner);
router.put('/banners/:id', bannerController.deleteBanner);
router.delete('/banners/:id', bannerController.deleteBanner);

module.exports = router;