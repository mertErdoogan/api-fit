const Banner = require('../models/banners');

// Get all Banners
exports.getBannerList = async (req, res) => {
    try {
      const banners = await Banner.findAll();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get banner with key
exports.getBannerData = async (req, res) => {
  try {
    const { key } = req.query;
    const banner = await Banner.findOne({
      where: {
        key,
      },
    });
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new banners
exports.createBanner = async (req, res) => {
  try {
    const { key, title, btnName, desc, isActive = false } = req.body;
    const banner = await Banner.create({ key, title, btnName, desc, isActive });
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a banners
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, title, btnName, desc, isActive } = req.body;
    const banner = await Banner.findByPk(id);
    if (banner) {
      banner.key = key;
      banner.title = title;
      banner.btnName = btnName;
      banner.desc = desc;
      banner.isActive = isActive;
      await banner.save();
      res.json(banner);
    } else {
      res.status(404).json({ error: "Banner not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a banners
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (banner) {
      await banner.destroy();
      res.json({ message: 'Banner deleted successfully' });
    } else {
      res.status(404).json({ error: 'Banner not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};