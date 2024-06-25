const AboutMe = require('../models/aboutMe');

// Get all Abouts
exports.getAboutMeList = async (req, res) => {
  try {
    const about = await AboutMe.findAll();
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get about with key
exports.getAboutMeData = async (req, res) => {
  try {
    const { key } = req.query;
      const about = await AboutMe.findOne({
        where: {
          key: key || 'home-about-me',
        },
      });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new AboutMe
exports.createAboutMe = async (req, res) => {
  try {
    const { key, title, btnName, desc, isActive = false } = req.body;
    const about = await AboutMe.create({ key, title, btnName, desc, isActive });
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a AboutMe
exports.updateAboutMe = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, title, btnName, desc, isActive } = req.body;
    const about = await AboutMe.findByPk(id);
    if (about) {
      about.key = key;
      about.title = title;
      about.btnName = btnName;
      about.desc = desc;
      about.isActive = isActive;
      await about.save();
      res.json(about);
    } else {
      res.status(404).json({ error: "AboutMe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a AboutMe
exports.deleteAboutMe = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await AboutMe.findByPk(id);
    if (about) {
      await about.destroy();
      res.json({ message: 'AboutMe deleted successfully' });
    } else {
      res.status(404).json({ error: 'AboutMe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};